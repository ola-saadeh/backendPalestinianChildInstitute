const express = require('express');
const Joi = require('joi'); 
const router = express.Router();
//Controllers
const post = require('../controller/message');
const Authorization = require('../controller/Authorization');
const Validation = require('../controller/validation');
const login = require('../controller/login')
//Routes
const schemas = { 
    blogPOST: Joi.object().keys({ 
        
        UserIdOne: Joi.string().required(), 
        UserIdTwo: Joi.string().required(), 
        text: Joi.string().required(), 
        vidio: Joi.string() , 
        image: Joi.string(), 
        TimeSend:Joi.date(),   
        typeToOne:Joi.number(), 
        typeToTwo:Joi.number(), 
       
    })
 }

router.post('/create',  Validation.middleware(schemas.blogPOST, 'body') , post.creat);
router.get('/:id1/:id2', post.getByIdSend);
router.put('/:id' ,Authorization.authorization ,  post.update);
router.delete('/:id', Authorization.authorization,post.delete);
module.exports = router;

