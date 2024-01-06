const postShema = require('../models/message')
const bcrypt = require("bcrypt")
const { ObjectId } = require('mongodb')
const { json } = require('express')
const { set } = require('mongoose')
const nodemailer = require("nodemailer");
exports.creat = async (req, res) => {

    try { 

        let post = postShema(req.body);
   const posting = await post.save()
   res.send ("done posting")

    }
    catch (err) {
        res.send(err)
     }
  }

  exports.update = async (req, res) => {

    try { 
        let postId =req.params.id

        let post = postShema(req.body);
   const posting = await postShema.updateOne({ _id : postId } , { $set:post })


    }
    catch (err) {
        res.send(err)
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



  exports.getByIdSend = async (req, res, next) => {

    if (ObjectId.isValid(req.params.id1)) {
    console.log("database")
       try {
         const result =  await postShema.find({ UserIdOne: new ObjectId(req.params.id1) , UserIdTwo :new ObjectId(req.params.id2) })
          res.status(200).json(result)
       }
       catch { 
          err => {
             res.status(500).json("no user with this id")
          }
       }
    }
  }