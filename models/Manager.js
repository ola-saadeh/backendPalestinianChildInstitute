const mongos = require('mongoose')
const Schema = mongos.Schema
const spicalistSchema = new Schema({
    firstname:{ type: String } ,
    lastname : { type: String },
    birthday :{ type: String } ,
    patientNumber: { type: String }, 
    officephone :{type :Number} 
});
module.exports = mongos.model('spicalist',spicalistSchema )

