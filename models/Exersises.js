const mongos = require('mongoose')
const Schema = mongos.Schema
const ExersisesSchema = new Schema({
        spicalistID: { type: String }, 
        startDate: { type: Date }, 
        endDate: { type: Date }, 
        Name:{ type: String },
        image:{ type: String }  , 
        done:{ type: String }
       

});
module.exports = mongos.model('Exersises',ExersisesSchema )

