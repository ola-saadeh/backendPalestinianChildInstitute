const studentSchema = require('../models/Students')
const loginSchema = require('../models/Login')
const bcrypt = require("bcrypt")
const multer = require('multer')
const { ObjectId } = require('mongodb')
const { json } = require('express')
const { set } = require('mongoose')
const nodemailer = require('nodemailer');

exports.creat = async (req, res) => {
   try {
      const saltRounds = 0;
                bcrypt.hash (req.body.password, saltRounds,  async (err, hash) =>{
                   if (err) {
                       // Handle error
                   } else {
                       // Store the hash in your database
                       req.body.password  = hash ;
                       console.log(req.body.password)
                       
        const result =  await loginSchema.findOne({ email: req.body.email})
        console.log(result)
            if (result == null)
            {
              let v =  mailService(req.body.email ) 
              console.log (v)
               if ( v){

                       let student = studentSchema(req.body);
                       let login = loginSchema(req.body);
                        console.log (student)
                       const savedStudent = await student.save()
                       
                       login.type = "11" 
                       login.ID = student._id
                       console.log (login.type)
                       const savedlogin = await login.save()
                       res.send("student added") 
                     }
                     else {
                        res.send(" email is not valid")
                     }
                    
            } 

            else {
               res.send("you are orady have account  ") 
            }
                   }

                   })
   } 
   catch (err) {
      res.send(err)
   }
}




async function   mailService   (useremail  ) {
   let mailTransporter = nodemailer.createTransport({
     service: "gmail",
     auth: {
       user: "olas3ada12@gmail.com",
 // use generated app password for gmail
       pass: "gmeqfakolghgspou",
     },
   });
 
   // setting credentials
   let mailDetails = {
     from: "olas3ada12@gmail.com",
     to: useremail,
     subject: "",
     text: ``,
   };
let v ;
   // sending email
   await  mailTransporter.sendMail (mailDetails, function (err, data) {
     if (err) {
       console.log("error occurred", err.message);
      
     } else {
      v = "true";
       console.log("---------------------");
       console.log("email sent successfully");
     
     }
   
   }
   
   );
   return v 
   
 }


 exports.getById = async (req, res, next) => {

  if (ObjectId.isValid(req.params.id)) {
  console.log("database")
     try {
       const result =  await studentSchema.findOne({ _id: new ObjectId(req.params.id) })
        res.status(200).json(result)
     }
     catch {
        err => {
           res.status(500).json("no user with this id")
        }
     }
  }
}

exports.getAll = async (req, res, next) => {

 
   console.log("database")
      try {
        const result =  await studentSchema.find()
         res.status(200).json(result)
      }
      catch {
         err => {
            res.status(500).json("no user with this id")
         }
      }
   
 }
exports.delete = async (req, res) => {
  
   let studentId =req.id
       const studentshema = await studentSchema.findOne({ _id :studentId} ); 
       if (studentshema !== null)
       {
   if (ObjectId.isValid(req.id)) {
      
      try { 
      
       

         await loginSchema.deleteOne({ID:studentId})
         const savedStudent = await studentSchema.deleteOne({ _id: new ObjectId(req.id) })
         res.status(204).json(savedStudent)

     
   }
   catch {
      err => {
         res.status(500).json(err)
      }
   }
}

   }
else{
   res.status(200).json(studentId)
}
     


}





exports.update = async (req, res) => {
   if (ObjectId.isValid(req.id)) { 
       const studentshema = await studentSchema.findOne({_id:req.id} );
     if (studentshema != null)  
   {
       let schema = req.body
      await studentSchema
           .updateOne({ _id: new ObjectId(req.id) },{$set: schema })
           .then(doc => {
            res.status(200).json(req.body)
         })
         .catch(err => {
            res.status(500).json(err)
         })
   }
   else{
      res.status(200).json("you don't have acount  pls make acount ")
    }
       

}}





