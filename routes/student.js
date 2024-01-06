const express = require('express');
const Joi = require('joi'); 
const router = express.Router();
//Controllers

const multer = require('multer')

const bodyParser = require("body-parser");
const fs = require("fs");

const student = require('../controller/student');
const Authorization = require('../controller/Authorization');
const Validation = require('../controller/validation');
const login = require('../controller/login')
//Routes
const schemas = { 
    blogPOST: Joi.object().keys({ 
        patientNumber: Joi.number().required(), 
        email:Joi.string().required(),
        password: Joi.string().required(), 
        firstname: Joi.string().required(), 
        lastname: Joi.string().required(), 
        birthday:Joi.date() ,
        medicalHistroy :Joi.string().required(),
        address:Joi.string(),
        condition :Joi.string() ,
        studentImage:Joi.string(),
        confirmPassword:Joi.string(),
        file :Joi.string() , 
        Otherdiseases :Joi.string(),
        phone:Joi.number().required(),
        allergies :Joi.string().required(),
        country:Joi.string(),
        emergencyContact  :Joi.string(),
        
       reports:Joi.string(), 
       studentImage  :Joi.string(), 
       educationLevel :Joi.string(),
    
       languagePreference :Joi.string(),
       guardianNames :Joi.string(),
       occupation :Joi.string(),

       phoneNumbers :Joi.string(),

       legalDocumentation:Joi.string(),
       gender:Joi.string(),
       RelationshiptothePatient  :Joi.string(),
       emailAddressesguardian:Joi.string(),
    })
 }


 const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "D:/hi/olamobile/src/images")
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`)
  }
})

const upload = multer({storage})
  
router.post('/create',  Validation.middleware(schemas.blogPOST, 'body') , student.creat);
router.get('/:id', student.getById);
router.get('/', student.getAll);
router.post('/login', login.login);
router.post('/resetPassword',login.reset);
router.post('/resetPasswordConfirm',login.resetPasswordConfirm);

router.put('/' ,Authorization.authorization ,  student.update);
router.delete('/', Authorization.authorization,student.delete);
router.post('/upload', upload.single('file'), (req, res, next) => {
  try {
    // تحقق من وجود الملف
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // قم بمعالجة الملف كما تشاء هنا
    // في هذا المثال، سنقوم بإرسال اسم الملف وحجمه كرد
    const fileName = req.file.originalname;
    const fileSize = req.file.size;

    res.json({
      message: 'File uploaded successfully.',
      fileName: fileName,
      fileSize: fileSize,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;  

