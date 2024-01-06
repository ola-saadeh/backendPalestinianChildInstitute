const express = require('express');
const router = express.Router();
//Controllers
const Joi = require('joi'); 
const Schedule = require('../controller/Schoudle');
const Validation = require('../controller/validation');
const deletetime = require('../models/deletedTime')
//Routes
const schemas = { 
    blogPOST: Joi.object().keys({ 
        spicalistId: Joi.string().required(), 
        startDate: Joi.date(), 
        endDate: Joi.date(), 
        classRoom:Joi.string(),
        studentId:Joi.string(),
        condition:Joi.string(),

      
    }) 
 }

 const schemasdelete = { 
    blogPOST: Joi.object().keys({ 
        spicalistId: Joi.string().required(), 
        startDate: Joi.date(), 
        endDate: Joi.date(), 
    })
 }

router.post('/create', Validation.middleware(schemas.blogPOST, 'body'), Schedule.create );
router.post('/delete', Validation.middleware(schemasdelete.blogPOST, 'body'), Schedule.delete );
router.put('/:id',  Schedule.Add );
router.delete('/:id', Schedule.remove );
router.get('/:id',  Schedule.getSchedules );
router.get('/user/:id',  Schedule.getSchedulesbyuser );
module.exports = router;