const express = require('express');
const Joi = require('joi'); 
const router = express.Router();
//Controllers
const post = require('../controller/post');
const Authorization = require('../controller/Authorization');
const Validation = require('../controller/validation');
const login = require('../controller/login')
//Routes
const schemas = { 
    blogPOST: Joi.object().keys({ 
        
        spicalistId: Joi.string().required(), 
        text: Joi.string().required(), 
        vidio: Joi.string() , 
        image: Joi.string(), 
        Time:Joi.date(),   
        title:Joi.string(), 
        likes:Joi.number(),
       
    })
 }

router.post('/create',  Validation.middleware(schemas.blogPOST, 'body') , post.creat);
router.get('/:id', post.getById);
router.put('/:id' ,Authorization.authorization ,  post.update);
router.delete('/:id', Authorization.authorization,post.delete);
module.exports = router;

