
const { ObjectId } = require('mongodb')
const loginSchema = require('../models/Login');
const student = require('../controller/student');
const express = require('express');
const router = express.Router();
// Import the jwt-decode library
 
require('dotenv').config();
const { jwtDecode } =  require("jwt-decode");

exports.authorization = async (req, res, next ) => {

 
// Decode the JWT
const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
   decodedToken = jwtDecode(bearerHeader);
    req.id = decodedToken.studentId;
    console.log(decodedToken);
    }
    else{
        res.status(403).json({Message:"Not Allowed"}); 
    }
          if (decodedToken?.studentId) 
        {
          try{
            
         next()
          }
          catch(err) {
            res.status(500).json(err)
          }
    }
    else {
       res.status(500).json("uncorrect id ")
        }
    }
    

 
 
 