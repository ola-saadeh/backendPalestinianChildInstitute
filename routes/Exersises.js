const express = require('express');
const router = express.Router();
const Joi = require('joi'); 
const Courses = require('../controller/Exersises');
const Validation = require('../controller/validation');
const schemas = { 
    blogPOST: Joi.object().keys({ 
        
        spicalistID: Joi.string().required(), 
        startDate: Joi.date(), 
        endDate: Joi.date(), 
        Name:Joi.string(),
        image:Joi.string(),
       
    })
 }


router.post('/create',Validation.middleware(schemas.blogPOST, 'body'), Courses.addCourse);
router.post ('/addstudent' , Courses.addCourseTostudent)
router.get  ('/:id' , Courses.getallexersisesforstudent)
router.get  ('/ex/:id' , Courses.getallexersisesforsp)
router.put  ('/:id' , Courses.update)
module.exports = router;