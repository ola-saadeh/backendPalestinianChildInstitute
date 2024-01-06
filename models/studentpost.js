const { number } = require('joi');
const mongos = require('mongoose')
const Schema = mongos.Schema
const commantSchema = new Schema({
    studentId :{ type: String },
    postId: { type: String },
    Time : { type: Date },
    text:{ type: String }, 
    like :{type : String},
     
  
});
module.exports = mongos.model('comment', commantSchema)

