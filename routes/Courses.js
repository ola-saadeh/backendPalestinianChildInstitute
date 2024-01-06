const express = require('express');
const router = express.Router();
const Joi = require('joi'); 
const Courses = require('../controller/Courses');
const Validation = require('../controller/validation');
const schemas = { 
    blogPOST: Joi.object().keys({ 
        studentID: Joi.string().required(), 
        spicalistID: Joi.string().required(), 
        startTime: Joi.date(), 
        endTime: Joi.date(), 
        Name:Joi.string(),
        image:Joi.string(),
        teacherName:Joi.string(),
    })
 }
router.get('/', Courses.getAll);
router.get('/:coursenumbser', Courses.getbycoursenumbser);
router.post('/create',Validation.middleware(schemas.blogPOST, 'body'), Courses.addCourse);
router.put('/:id', Courses.update);
module.exports = router;