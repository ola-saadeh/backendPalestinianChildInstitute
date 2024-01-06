
const { ObjectId } = require('mongodb')
const CoursesShema = require('../models/Exersises');
const ExersisesShema = require('../models/Student-Exersises');

exports.addCourseTostudent = async (req, res , next) => {
console.log ("bbbbbbbb")
    let Exersises = ExersisesShema(req.body);
    const savedExersises = await Exersises.save()
    console.log(req.body)
    res.send(savedExersises)
    
 }


 exports.getallexersisesforstudent = async (req, res , next) => {
    try {
       let  exersise = [] ; 
        Courses = await ExersisesShema.find({studentId : req.params.id} )
        for(let i = 0 ; i < Courses.length ; i++)
        {
            Courses1 = await CoursesShema.findOne({ _id : new ObjectId(Courses[i].ExersisesId)
              
            } )

            exersise[i]= Courses1 ;
          
               }
               console.log( exersise  , Courses)
        res.status(200).json({"ex" :exersise , "done": Courses })
     }
     catch {
        err => {
           res.status(500).json(err)
        }
     
  }
    
 }



 
 exports.getallexersisesforsp = async (req, res , next) => {
   try {
      let  exersise = [] ; 
       Courses = await CoursesShema.find({spicalistID: req.params.id} )
       
              console.log(  Courses)
              res.status(200).json(Courses)
    }
    catch {
       err => {
          res.status(500).json(err)
       }
    
 }
   
}

exports.addCourse = async (req, res , next) => {

   let Course = CoursesShema(req.body);
   const savedCourse = await Course.save()
   console.log(req.body)
   res.send(savedCourse)
   
}


exports.update = async (req, res) => {
   if (ObjectId.isValid(req.params.id)) {
      
       let schema = req.body
     let mm=  await ExersisesShema
           .updateOne({ ExersisesId: req.params.id },{$set: schema })
           .then(doc => {
            res.status(200).json(doc)
         })
         .catch(err => {
            res.status(500).json(err)
         })
   }
   

}