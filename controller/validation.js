const Joi = require('joi')


exports.middleware = (schema, property) => { 
    return (req, res, next) => { 
    const { error } = schema.validate(req[property]); 
    const valid = error == null; 
    if (valid) { next(); } 
    else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',')
      console.log("error", message); 
      console.log(req[property])
      res.status(422).json({ error: message }) 
    } 
  } 
} 
