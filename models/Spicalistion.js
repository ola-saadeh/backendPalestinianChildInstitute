const mongos = require('mongoose')
const Schema = mongos.Schema
const spicalistSchema = new Schema({
   
    
    firstname:{ type: String } ,
    lastname : { type: String },
    birthday :{ type: String } ,
    spicalistNumber: { type: String }, 
    subjectofspecialization:{ type: String },
    officephone :{type :Number},
    spimage :{type:String},
    isAvailable :{type:Boolean}
});
module.exports = mongos.model('spicalist',spicalistSchema )

