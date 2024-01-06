const express = require('express');
const Joi = require('joi');
const router = express.Router();
//Controllers
const Spicalistion = require('../controller/spicalistion');
const Authorization = require('../controller/Authorization');
const Validation = require('../controller/validation');
const login = require('../controller/login')
//Routes
const schemas = {
    blogPOST: Joi.object().keys({



        patientNumber: Joi.string(),
        subjectofspecialization: Joi.string(),
        officephone: Joi.number(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required(),
        birthday: Joi.date(),
        spimage :Joi.string(),
        isAvailable :Joi.boolean()

    })
}

router.post('/create', Validation.middleware(schemas.blogPOST, 'body'), Spicalistion.creat);
router.get('/:id', Spicalistion.getById);
router.get('/', Spicalistion.getall);

router.post('/login', login.login);
router.put('/', Authorization.authorization, Spicalistion.update);
router.put('/:id', Spicalistion.update1);

router.delete('/', Authorization.authorization, Spicalistion.delete);
module.exports = router;

