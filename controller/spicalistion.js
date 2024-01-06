const SpicalistionSchema = require('../models/Spicalistion')
const loginSchema = require('../models/Login')
const bcrypt = require("bcrypt")
const { ObjectId } = require('mongodb')
const { json } = require('express')
const { set } = require('mongoose')
const nodemailer = require("nodemailer");
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

                       let Spicalistion = SpicalistionSchema(req.body);
                       let login = loginSchema(req.body);
                        console.log (Spicalistion)
                       const savedSpicalistion = await Spicalistion.save()
                       
                       login.type = "10" 
                       login.ID = Spicalistion._id
                       console.log (login.type)
                       const savedlogin = await login.save()
                       res.send("Spicalistion added") 
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
     from: "olas3ada@gmail.com",
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

 exports.getall = async (req, res, next) => {

    
   console.log("database")
      try {
        const result =  await SpicalistionSchema.find();
         res.status(200).json(result)
      }
      catch {
         err => {
            res.status(500).json("no user with this id")
         }
      }
   
 }

 exports.getById = async (req, res, next) => {

  if (ObjectId.isValid(req.params.id)) {
  console.log("database")
     try {
       const result =  await SpicalistionSchema.findOne({ _id: new ObjectId(req.params.id) })
        res.status(200).json(result)
     }
     catch {
        err => {
           res.status(500).json("no user with this id")
        }
     }
  }
}




exports.delete = async (req, res) => {
  
   let SpicalistionId =req.id
       const Spicalistionshema = await SpicalistionSchema.findOne({ _id :SpicalistionId} ); 
       if (Spicalistionshema !== null)
       {
   if (ObjectId.isValid(req.id)) {
      
      try { 
      
       

         await loginSchema.deleteOne({ID:SpicalistionId})
         const savedSpicalistion = await SpicalistionSchema.deleteOne({ _id: new ObjectId(req.id) })
         res.status(204).json(savedSpicalistion)

     
   }
   catch {
      err => {
         res.status(500).json(err)
      }
   }
}

   }
else{
   res.status(200).json(SpicalistionId)
}
     


}



exports.update1 = async (req, res) => {
   if (ObjectId.isValid(req.params.id)) {
       let SpicalistionId =req.params.id
       const Spicalistionshema = await SpicalistionSchema.findOne({_id:SpicalistionId} );
     if (Spicalistionshema != null)  
   {
       let schema = req.body
      await SpicalistionSchema
           .updateOne({ _id: new ObjectId(req.params.id) },{$set: schema })
           .then(doc => {
            res.status(200).json( Spicalistionshema)
         })
         .catch(err => {
            res.status(500).json(err)
         })
   }
   else{
      res.status(200).json("you don't have acount  pls make acount ")
    }
       

}}

exports.update = async (req, res) => {
   if (ObjectId.isValid(req.id)) {
       let SpicalistionId =req.id
       const Spicalistionshema = await SpicalistionSchema.findOne({_id:SpicalistionId} );
     if (Spicalistionshema != null)  
   {
       let schema = req.body
      await SpicalistionSchema
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