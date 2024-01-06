const express = require('express')
const cors = require('cors')
const studentSchema = require('./models/Students')
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongodb');
const studentRouter = require('./routes/student');
const spicalistionRouter = require('./routes/Spicalistion');
const schoudleRouter = require('./routes/schoudle');
const postRouter = require('./routes/post');
const commant= require('./routes/comment');
const studentspicalistion =require('./routes/studentspicalistion')
const Courses = require('./routes/Courses')
const schedulesvalideroute = require('./routes/schoudleavarlible')
const Exersises = require('./routes/Exersises')
const appoint = require('./routes/appoint')

const Institute = express();
const message =require('./routes/message');
const bodyParser = require("body-parser");
const fs = require("fs");
Institute.use(
   cors({
     allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
     exposedHeaders: ["authorization"], // you can change the headers
     origin: "*",
     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
     preflightContinue: false
   })
 );
 
 Institute.use(express.json());
 Institute.use(cors())
 
 Institute.use(bodyParser.urlencoded({ extended: false }));
 Institute.use(bodyParser.json());
// For parsing application/x-www-form-urlencoded
Institute.use(express.urlencoded({ extended: true }));
Institute.use( '/appoint' , appoint )

Institute.use( '/message' , message )
Institute.use( '/student' ,  studentRouter)
Institute.use( '/Spicalistion' ,  spicalistionRouter)
Institute.use( '/schoudle' ,  schoudleRouter)
Institute.use( '/post' ,  postRouter)
Institute.use( '/studentspicalistion' ,  studentspicalistion)
Institute.use( '/schedulesvalideroute' ,  schedulesvalideroute)
Institute.use( '/commant' ,  commant)
Institute.use( '/Courses' ,  Courses)
Institute.use( '/Exersises' ,  Exersises)
 
const connection = async () => {  
    await mongoose.connect('mongodb://127.0.0.1:27017/Institute').then(res => {
      Institute.listen(3003, () => {
          console.log('listening on port 3003')

          //port we lidtening to 
       })
    })
 }


 
//connect to Database (mongoose)
connection();
