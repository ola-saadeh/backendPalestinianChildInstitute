const express = require('express');
const Joi = require('joi'); 
const router = express.Router();
//Controllers
const commant = require('../controller/commant');
const Authorization = require('../controller/Authorization');
const Validation = require('../controller/validation');
const login = require('../controller/login')
//Routes


router.post('/create', commant.creat);
router.get('/:id', commant.getById);

module.exports = router;

