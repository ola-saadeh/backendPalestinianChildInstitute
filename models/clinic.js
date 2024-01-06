const mongos = require('mongoose')
const Schema = mongos.Schema
const CoursesSchema = new Schema({
   
    

    studentID: { type: String }, 
        spicalistID: { type: String }, 
        startTime: { type: Date }, 
        endTime: { type: Date }, 
        Name:{ type: String },
        image:{ type: String },
        teacherName:{ type: String },

});
module.exports = mongos.model('Courses',CoursesSchema )

