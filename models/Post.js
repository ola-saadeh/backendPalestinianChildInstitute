const { number } = require('joi');
const mongos = require('mongoose')
const Schema = mongos.Schema
const PostSchema = new Schema({

    spicalistId: { type: String },
    Time : { type: Date },
    text:{ type: String },
    vidio:{type : String} ,
    image :{type : String} , 
    likes :{type : Number},
    title :{type : String} , 
  
});
module.exports = mongos.model('Post', PostSchema)

