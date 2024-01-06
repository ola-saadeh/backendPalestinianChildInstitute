const mongos = require('mongoose')
const Schema = mongos.Schema
const loginSchema = new Schema({

    type: { type: String },
    email : { type: String },
    password : { type: String } , 
    ID:{ type: String },
    code:{type:String},
    verified:{type:Boolean},
    resettoken:{type:String},
    resettokenExpiration :{type: Date}

});
module.exports = mongos.model('login',loginSchema )

