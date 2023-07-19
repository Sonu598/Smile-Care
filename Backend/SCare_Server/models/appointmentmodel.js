const mongoose = require("mongoose");
const appointmentSchema =new mongoose.Schema({
    doctorId : {type:mongoose.Schema.Types.ObjectId,ref:"user"},
    userId : {type:mongoose.Schema.Types.ObjectId,ref:"user"},
    deleted : {type:Boolean,default:false},
    time : {type:String,required:true},
    date : {type:String,required:true},
    status : {type:String,enum:["pending","accepted","rejected"],default:"pending"},
},{timestamps:true,versionKey:false})

const AppointmentModel = mongoose.model("appointments",appointmentSchema);

module.exports={
    AppointmentModel
};