const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')
const login = require('../models/Login');
require('dotenv').config()
// Import the jwt-decode library
const jwtDecode = require('jwt-decode');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
 // These id's and secrets should come from .env file.
const CLIENT_ID = '992713854190-11olkm914lhsijau74f2969keki1b1lt.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04NN45ZjWQ4XuCgYIARAAGAQSNwF-L9IrBhTPnhAP_aU8FmwCHAnGNPKD8BzuApmatXshnbGEEhcci1lflovU9aatSDEVawIpD-s';
 const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
   REDIRECT_URI
 );

 oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//  async function sendMail(email) {
//    try {
//      const accessToken = await oAuth2Client.getAccessToken();
//  console.log(email)
//      const transport = nodemailer.createTransport({
//        service: 'gmail',
//        auth: {
//          type: 'OAuth2',
//          user: 'ola.saadeh@stu.najah.edu',
//          clientId: CLIENT_ID,
//          clientSecret: CLEINT_SECRET,
//          refreshToken: REFRESH_TOKEN,
//          accessToken: accessToken,
//        },
//      });

//      const mailOptions = {
//       from: 'OLA SAADEH <ola.saadeh@stu.najah.edu>',
//       to: email,
//       subject: 'Hello from gmail using API',
//       text: 'Hello from gmail email using API',
//       html: '<h1>Hello from gmail email using API</h1>',
//     };

//     const result = await transport.sendMail(mailOptions);
//     return result;
//   } catch (error) {
//     return error;
//   }
// }
// sendMail()
//   .then((result) => console.log('Email sent...', result))
//   .catch((error) => console.log(error.message));









exports.login = async (req, res) => {
	try {// Get user input
        const { email: email, password } = req.body  // Validate user input
        
        const student = await login.findOne({ email: email });
        if (student && (await bcrypt.compare(password, student.password))) {// Create token 
        
          const token = jwt.sign(
            { email: email , studentId: student.ID},
            'secret-token-here',
            {
              expiresIn: "2h",
            }
          );
          
          // user
         
          res.status(200).json({"token" :token ,message: student.type});
          
        }
        else {
        res.status(200).send("Incorrect password");
        }
      }catch (err) {
        console.log(err);
      }
};


async function generateCode(length){
  let result = '';
  const charachters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charachterslength = charachters.length;
  let counter = 0 ;
  while(counter<length){
    result += charachters.charAt(Math.floor(Math.random()* charachterslength));
    counter +=1;
  } 
  return result;
}
exports.reset =async (req, res) => {
	 
        const  {email}  = req.body // Validate user input
        console.log("ils",email)
        
        const existingUser = await login.findOne({ email });
        if (!existingUser) {
          console.error({ success: false, message: 'There was an Error' });
          return res.send({ success: false, message: 'If user exists, an email was sent' });
        }
        const token = await generateCode(5)
        existingUser.resettoken = token;
        existingUser.resettokenExpiration = Date.now() + 3600000;
        await existingUser.save();
        try {
          const accessToken = await oAuth2Client.getAccessToken();
      console.log(email)
          const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: 'ola.saadeh@stu.najah.edu',
              clientId: CLIENT_ID,
              clientSecret: CLEINT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken,
            },
          });
     
          const mailOptions = {
           from: 'Palestinian Child Institute <ola.saadeh@stu.najah.edu>',
           to: email,
           subject: 'Reset your password',
           text: `your code is ${token}`,
           html: `<h1>your code is ${token}</h1>`,
         };
     
         const result = await transport.sendMail(mailOptions).then((result) => console.log('Email sent...', result))
           .catch((error) => console.log(error.message));
         return  res.send({ success: true, message: 'Email sent' });
       } catch (error) {
         return error;
       }
        
 


    
};


exports.resetPasswordConfirm = async (req, res) => {
  try {
   
    const email = req.body.email
    const verificationCode = req.body.verificationCode
    const password = req.body.password
    const cpassword = req.body.cnewpassword
    if(password !== cpassword){
      return res.status(400).send({ success: false,message: 'your password doesnt match' });

    }
    const user = await login.findOne({ email });
 
    if (!user || user.resettoken !== verificationCode) {
      return res.status(400).send({ success: false });
    }
    if (user.resettokenExpiration < new Date()) {
      return res.status(400).send({ success: false, message: 'Token has expired.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.token = '';
  
    await user.save();
    return res.status(200).send({ success: true });
    
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: 'An error occurred. Please try again later.' });
  }
};