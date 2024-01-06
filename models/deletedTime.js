const mongos = require('mongoose')
const Schema = mongos.Schema
const deletedTimeSchema = new Schema({

    
    spicalistId: { type: String },
    startTime : { type: Date },
    endTime : { type: Date },
  
  
});
module.exports = mongos.model('deletedTime', deletedTimeSchema)

