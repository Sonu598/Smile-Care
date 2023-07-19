const { auth } = require('../controllers/authorization');
const { AppointmentModel } = require('../models/appointmentmodel');
const UserModel = require('../models/usermodel');
const appointmentRouter = require("express").Router();


//1. get all doctors for appointment page

appointmentRouter.get("/doctors",async(req,res)=>{
    try{
        let data = await UserModel.find({role:"Doctor"});
        res.send(data)
    }catch(err){
        console.log("errror in /appointments/doctors | get",err)
    }
})



appointmentRouter.post("/",auth,async(req,res)=>{
    try{
   
    let {userId,doctorId,message,time,date}=req.body;
    if(!userId){
        res.status(401).json("you are not authorized")
    }
    else if (!doctorId){
        res.status(507).json('No doctor selected')
    }
    else if(!time){
        res.status(507).json('No time selected')
    }
    else if (!date){
        res.status(507).json("No date selected")
    }
    else {
        let appointmentExists = await AppointmentModel.findOne({time,date,doctorId})
        if(appointmentExists){
            res.status(409).json("That slot is already booked")
        }
        else{
            let newAppointment = new AppointmentModel(req.body);
            let output= await newAppointment.save();
            res.send(output)
        }
    }
    }catch(err){
        console.log("error in appointmentRouter | get",err)
        res.status(500).json("server error")
}
})


//all appointments of a doctor
appointmentRouter.get("/patient",async(req,res)=>{
    let userId = "648c47af54f8af600e3e1d45"
    try{
        let data = await AppointmentModel.aggregate([
            {
                "$lookup": {
                    "from": "users",
                    "localField": "userId",
                    "foreignField": "_id",
                    "as": "user"
                }
            }
        ]);
        res.send(data)
    }catch(err){console.log("error in appointment | get",err)}
})

//all appointments of a user


appointmentRouter.get("/",auth,async(req,res)=>{
    let userId = req.body.userId;
    try{
        let data = await AppointmentModel.aggregate([
            { $match: { $expr : { $eq: [ '$userId' , { $toObjectId: userId } ] } } },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "doctorId",
                    "foreignField": "_id",
                    "as": "doctor"
                }
            }
        ]);
        res.send(data)
    }catch(err){console.log("error in appointment | get",err)}
})

//all appointments of a doctor
appointmentRouter.get("/patient",auth,async(req,res)=>{
    try{
        let userId = req.body.userId;
        let data = await AppointmentModel.aggregate([
            { $match: { $expr : { $eq: [ '$doctorId' , { $toObjectId: userId } ] } } },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "userId",
                    "foreignField": "_id",
                    "as": "user"
                }
            }




        ]);
        res.send(data)
    }catch(err){console.log("error in appointment | get",err)}
})
//update appointment 
appointmentRouter.patch("/:appointmentId",auth,async(req,res)=>{
    try{
    let userId = req.body.userId;
    let {status} =req.body;
    let appointmentId = req.params.appointmentId;
    let appointmentExists =await AppointmentModel.findOne({_id:appointmentId,userId:userId})
    if(!status){res.status(400).json("please provide a status")}
    else if(!appointmentExists){res.status(401).json("you are not authorized to make changes on this appointment or this appointment doesn't exists")}
    else if(status=="accepted" || status=="rejected"){
        let data =await AppointmentModel.findOneAndUpdate({_id:appointmentId},{status},{new:true});
        res.send(data)
    }
    else{
        res.status(400).json("That's not a valid status")
    }
    }catch(err){console.log("error in appointment | get",err)}
})


//delete an appointment from userside

appointmentRouter.delete("/:id",auth,async(req,res)=>{
    try{
        
        let output = await AppointmentModel.findByIdAndDelete(req.params.id);
        res.send(output)
    }catch(err){console.log("err in delete appointment",err)}
})

module.exports ={
    appointmentRouter
}