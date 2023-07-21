const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    name : String,
    email : String,
    password :String,
    fees:Number,
    location:String,
    experience:Number
})

const DoctorModel = mongoose.model("doctor",doctorSchema)

module.exports = DoctorModel