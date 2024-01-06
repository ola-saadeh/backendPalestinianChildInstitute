
const { ObjectId } = require('mongodb')
const CoursesShema = require('../models/clinic');


exports.update = async (req, res, next) => {
  
      
      const schema =req.body ;

      await CoursesShema
         .updateOne({ _courseNumber : req.params.coursenumbser }, schema)
         .then(doc => {
       res.status(200).json(doc)
         })
         .catch(err => {
            res.status(500).json(err)
         })
   }


exports.addCourse = async (req, res , next) => {

   let Course = CoursesShema(req.body);
   const savedCourse = await Course.save()
   console.log(req.body)
   res.send(savedCourse)
   
}
exports.getAll = async (req, res, next) => {
    
   
    console.log("database")
    try {
       Courses = await CoursesShema.find()
       res.status(200).json(Courses)
    }
    catch {
       err => {
          res.status(500).json(err)
       }
    
 }

}
exports.getbycoursenumbser = async (req, res, next) => {
  
   try {
      Courses = await CoursesShema.find({studentID : req.params.coursenumbser} )
      res.status(200).json(Courses)
   }
   catch {
      err => {
         res.status(500).json(err)
      }
   
}
   
}
