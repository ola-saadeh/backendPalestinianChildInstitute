const ScheduleSchema = require('../models/Schdoule')
const { ObjectId } = require('mongodb')
const Schedule = require('../models/Schdoule');
const { forEach } = require('async');
const deletetime = require("../models/deletedTime");

exports.create = async (req, res , next) => {

   let Schedule = ScheduleSchema(req.body);
   let deletetime1 = deletetime(req.body);
   try {

      studentclasses = await ScheduleSchema.find({ studentId: new ObjectId(req.body.studentId) })
     let v= overlapping (req, res ,studentclasses)
         if (v != 1 )
{
   
   
   const savedSchedule = await Schedule.save()
    res.send(savedSchedule)

 //  const deletetimes = await deletetime.find({ spicalistId: new ObjectId(req.body.spicalistId) })
   /*
   let vv= overlapping2 (req, res ,deletetimes , deletetime1)
    if (vv != 1 )
    {
      Schedule.condition = "no"
   const savedSchedule = await Schedule.save()
    res.send(savedSchedule)
    }
    */
}

         
   }
   catch (err) {
      console.log(err)
   }
}

exports.getSchedulesbyuser = async (req, res , next) => {
   if (ObjectId.isValid(req.params.id)) {
      console.log("database")
         try {
           const result =  await ScheduleSchema.find({ studentId: new ObjectId(req.params.id)   })
            res.status(200).json(result)
         }
         catch {
            err => {
               res.status(500).json("no user with this id")
            }
         }
      }
}

exports.delete = async (req, res , next) => {
   let deleteSchedule = deletetime(req.body);
   const deletes = await deleteSchedule.save()
   res.send(deletes)
}
 

exports.Add =  async (req, res , next) => {


   studentclasses = await ScheduleSchema.updateOne({ _id: new ObjectId(req.params.id) },{$set: {condition : "yes"} })
 console.log (studentclasses)
 res.send("update is done")
}


exports.remove =  async (req, res , next) => {
 
      if (ObjectId.isValid(req.params.id)) {
         try {
           
            console.log("lllllll")
            await ScheduleSchema.deleteOne({ _id: new ObjectId(req.params.id) })
          res.send("delete is done")
           
            
         }
         catch {
            err => {
               res.status(500).json(err)
            }
         }
      }
   

}


function overlapping (req, res,studentclasses) {
 for ( let i = 0 ; i < studentclasses.length ; i++)
 {
   if (studentclasses[i] != null) {
      console.log(req.body.spicalistId)
      console.log(studentclasses[i].spicalistId)
      if (req.body.spicalistId == studentclasses[i].spicalistId) {
         
         console.log("the same")
         res.send("there is overlapping schedules");
         return 1
         
      }
   }
}
return 0
}




function overlapping2 (req, res,deletetimes , deletetime) {
   console.log ("lllllllll")

    for ( let i = 0 ; i < deletetimes.length ; i++)
    {
      if (deletetimes[i] != null) {
         console.log(deletetime.startTime)
         console.log(deletetimes[i].startTime)
         if (deletetime.startTime.getTime()  === deletetimes[i].startTime.getTime() ) {
            
            console.log("the time is deleted ")
            res.send("there is overlapping schedules");
            return 1

            

         }
      }
   }
   }

   exports.getSchedules =  async (req, res , next) => {
      if (ObjectId.isValid(req.params.id)) {
         console.log("database")
            try {
              const result =  await ScheduleSchema.find({ spicalistId: new ObjectId(req.params.id) })
               res.status(200).json(result)
            }
            catch {
               err => {
                  res.status(500).json("no user with this id")
               } 
            }
         }
   }