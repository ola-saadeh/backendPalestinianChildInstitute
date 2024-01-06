const express = require('express');
const router = express.Router();
//Controllers
const Joi = require('joi'); 
const appoint = require('../controller/appoint');
const Validation = require('../controller/validation');
 
//Routes
const schemas = { 
    blogPOST: Joi.object().keys({ 
        spicalistId: Joi.string().required(),
        selectedDays: Joi.array().items(Joi.string().valid('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
        selectedSlots: Joi.array().items(Joi.string()),
        classRoom: Joi.string().required()

      
    })
 }

 

router.post('/create', Validation.middleware(schemas.blogPOST, 'body'), appoint.create );
router.get('/appointments/:spicalistId', appoint.getAppointmentsBySpecialist);
 
router.delete('/appointments/:spicalistId', appoint.deleteAppointmentsBySpecialist);

module.exports = router;