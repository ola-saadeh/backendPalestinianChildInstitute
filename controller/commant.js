const commantshema = require('../models/studentpost')
const bcrypt = require("bcrypt")
const { ObjectId } = require('mongodb')
const { json } = require('express')
const { set } = require('mongoose')
const postShema = require('../models/Post')
const nodemailer = require("nodemailer");
const { required } = require('joi')
exports.creat = async (req, res) => {
    try { 
        let commant = commantshema(req.body);
   const commantdata = await commant.save()
   res.send ("done posting")
    }
    catch (err) {
        res.send(err)
     }
  }

  exports.getById = async (req, res, next) => {

    console.log("database")
       try {
         const result =  await commantshema.find({ postId:  req.params.id })
         
          console.log (result)
          res.status(200).json(result)
       }
       catch {
          err => {
             res.status(500).json("no user with this id")
             
          console.log (err)
           }
       
    }
  }




  exports.delete = async (req, res) => {

    let postId =req.params.id
       const postshema = await postShema.findOne({ _id :postId} ); 
       if (studentshema !== null)
       {
   if (ObjectId.isValid(req.params.id)) {
      
      try { 
      
       

       const deletepost = await postShema.deleteOne({_id:postId})
        res.status(204).json(deletepost)

     
   }
   catch {
      err => {
         res.status(500).json(err)
      }
   }
}

   }
else{
   res.status(200).json()
}
     
  }



  