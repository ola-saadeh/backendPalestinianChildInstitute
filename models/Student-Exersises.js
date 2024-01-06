const mongos = require('mongoose')
const Schema = mongos.Schema
const ExersisesStudentSchema = new Schema({
    ExersisesId : { type: String }, 
       studentId :{ type: String }, 
       happy: {type:Number} , 
     sad :  {type:Number}, 
     surprised : {type:Number} , 
     fearful:   {type:Number}, 
     angry :  {type:Number} ,
     natural:  {type:Number},
     done: {type:String},

       

});
module.exports = mongos.model('StudentExersises',ExersisesStudentSchema )

