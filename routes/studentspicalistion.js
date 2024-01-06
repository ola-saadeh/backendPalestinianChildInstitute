const express = require('express');
const Joi = require('joi'); 
const router = express.Router();
//Controllers

const multer = require('multer')

const student = require('../controller/student');
const Authorization = require('../controller/Authorization');
const Validation = require('../controller/validation');
const studentspicalistion = require('../controller/student-spicalist')
//Routes



   
router.post('/create' , studentspicalistion.creat);
router.get('/:id', studentspicalistion.getById);
router.get('/clinic/:id', studentspicalistion.getByclinicId);

router.get('/getstudent/:id', studentspicalistion.getAllStudent);
router.delete('/:id', Authorization.authorization,student.delete);

module.exports = router;

