const studentSchema = require('../models/Students')
const studentspicalistion = require('../models/student-spicalistion')
const bcrypt = require("bcrypt")
const multer = require('multer')
const { ObjectId } = require('mongodb')

const { json } = require('express')
const { set } = require('mongoose')
const nodemailer = require("nodemailer");
exports.creat = async (req, res) => {
    try {
        let studentspicalistiondata = studentspicalistion(req.body);
        
        const savedStudent = await studentspicalistiondata.save();

        res.send(savedStudent)
    }
    catch (err) {
        res.send(err)
    }
}

exports.getById = async (req, res, next) => {

    if (ObjectId.isValid(req.params.id)) {
        console.log("database")
        try {
            const result = await studentspicalistion.find({ studentId: new ObjectId(req.params.id) })
            res.status(200).json(result)
        }
        catch {
            err => {
                res.status(500).json("no user with this id")
            }
        }
    }
}

exports.getByclinicId = async (req, res, next) => {

    if (ObjectId.isValid(req.params.id)) {
        console.log("database")
        try {
            const result = await studentspicalistion.find({ clinicId: new ObjectId(req.params.id) })
            res.status(200).json(result)
        }
        catch {
            err => {
                res.status(500).json("no user with this id")
            }
        }
    }
}

exports.getAllStudent= async (req, res, next) => {

    if (ObjectId.isValid(req.params.id)) {
        console.log("database")
        try {
            let  students = [] ; 
            const result = await studentspicalistion.find({ spicalistId: new ObjectId(req.params.id) })
            console.log(result)
            for( let i= 0 ; i <result.length ; i++ )
            {console.log(result)
                console.log(result[i].studentId)
                const result2 = await studentSchema.findOne({ _id: result[i].studentId })
                console.log(result2)
                students[i]= result2 ;

            }

            res.status(200).json(students)
        }
        catch {
            err => {
                res.status(500).json("no user with this id")
            }
        }
    }
}

exports.delete = async (req, res) => {

    let studentId = req.params.id
    const studentshema = await studentSchema.findOne({ _id: studentId });
    if (studentshema !== null) {
        if (ObjectId.isValid(req.params.id)) {
            try {      
                const savedStudent = await studentspicalistion.deleteOne({ _id: new ObjectId(req.params.id) })
                res.status(204).json(savedStudent)
            }
            catch {
                err => {
                    res.status(500).json(err)
                }}
        }
    }
    else {
        res.status(200).json(studentId)
    }



}



