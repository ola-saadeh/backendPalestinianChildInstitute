const { number } = require('joi');
const mongos = require('mongoose')
const Schema = mongos.Schema
const PostSchema = new Schema({

    UserIdOne: { type: String },
    UserIdTwo: { type: String },
    TimeSend : { type: Date },
    text:{ type: String },
    vidio:{type : String} ,
    image :{type : String} , 
    typeToOne :{type : Number} , 
    typeToTwo :{type : Number} , 
  
});
module.exports = mongos.model('Message', PostSchema)

