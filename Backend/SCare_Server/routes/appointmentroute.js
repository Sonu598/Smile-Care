const { auth } = require('../controllers/authorization');
const { AppointmentModel } = require('../models/appointmentmodel');
const { UserModel } = require('../models/usermodel')
const { DoctorModel } = require('../models/doctormodel');
const appointmentRouter = require("express").Router();


//1. get all doctors for appointment page


appointmentRouter.post("/",auth,async(req,res)=>{
    try{
   
    let {username,doctorname,time,date}=req.body;
    if(!username){
        res.status(401).json("you are not authorized")
    }
    else if (!doctorname){
        res.status(507).json('No doctor selected')
    }
    else if(!time){
        res.status(507).json('No time selected')
    }
    else if (!date){
        res.status(507).json("No date selected")
    }
    else {
        let appointmentExists = await AppointmentModel.findOne({time,date,doctorname})
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

appointmentRouter.post("/sendmail",auth,async(req,res)=>{
    const {time,date,doctorname,username}=req.body;
    try{
        // let user= await UserModel.findOne({_id:userID});
        // let doctor= await DoctorModel.findOne({_id:doctorId});
        // console.log(user);
        
       
        let mailOptions = {
            from: 'smilecare.operation@gmail.com',
            to: user.email,
            subject: 'Smile Care Appointment',
            text: `Hello ${username},
            You have scheduled an appointment with ${doctorname}
            on Date :- ${date} at ${time}.
            Thank you for be with us`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(401).send({"error":"Internal server error"});
            } else {
                res.status(200).send({"msg":"Email sent successfully"});
            }
        });

    }catch(err){
        res.status(401).send(err.message);
    }
});


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