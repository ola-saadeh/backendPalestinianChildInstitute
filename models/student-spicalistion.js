const mongos = require('mongoose')
const Schema = mongos.Schema
const studentspicalistionSchema = new Schema({

    studentId: { type: String },
    spicalistId: { type: String },
    clinicId:{ type: String },
  
});
module.exports = mongos.model('studentspicalistionSchema', studentspicalistionSchema)

