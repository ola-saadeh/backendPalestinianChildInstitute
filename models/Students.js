const mongos = require('mongoose')
const Schema = mongos.Schema
const studentSchema = new Schema({
   
    
    firstname:{ type: String } ,
    lastname : { type: String },
    birthday :{ type: String } ,
    patientNumber: { type: String }, 
    condition:{ type: String } ,
     address :{ type: String } ,
     phone :{ type: Number },
    country  :{ type: String },
     medicalHistroy:{ type: String },
    reports:{ type: String },
    studentImage :{ type: String },
    educationLevel:{ type: String },
    allergies :{ type: String },
    languagePreference:{ type: String },
    guardianNames:{ type: String },
    occupation:{ type: String },
    phoneNumbers:{ type: String }, 
    legalDocumentation:{ type: String },
    gender:{ type: String }, 
    RelationshiptothePatient :{ type: String }, 
    emailAddressesguardian:{ type: String },
     
});
module.exports = mongos.model('student',studentSchema )

