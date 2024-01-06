const mongos = require('mongoose')
const Schema = mongos.Schema
const ScheduleSchema = new Schema({

    studentId: { type: String },
    spicalistId: { type: String },
    startDate : { type: Date },
    endDate : { type: Date },
    classRoom: { type: String },
    condition:{ type: String },
  
});
module.exports = mongos.model('Schedule', ScheduleSchema)

