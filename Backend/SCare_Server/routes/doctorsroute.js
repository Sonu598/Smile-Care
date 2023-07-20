const express=require("express");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const doctorRouter=express.Router();
const DoctorModel = require('../models/doctormodel');


doctorRouter.get("/allDoctor", async (req,res)=>{
    try {
      let list = await DoctorModel.find();
      res.status(200).send(list);
    } catch (err) {
      console.log('/doctor/allDoctor: ',err.message);
      res.status(500).send({msg: err.message});
    }
})

doctorRouter.post("/register", async (req, res) => {
    const { name, email, password, fees, location, experience } = req.body

    try {
        isUserPresent = await DoctorModel.findOne({ email })
        if (isUserPresent) {
            return res.send({ "msg": "Login Directly" })
        }

        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new DoctorModel({ name, email, password: hash, fees, location, experience })
            await user.save()
            res.status(201).send({ "msg": "Registration Succesfull" })
        });
    } catch (error) {
        res.status(401).send({ "msg": error.message })

    }

})


doctorRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await DoctorModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    let accesstoken = jwt.sign({ "userID": user._id }, 'accesstoken', { expiresIn: "7d" });


                    res.status(201).send({ "msg": "login success", "token": accesstoken, "user":user })

                } else {
                    res.status(401).send({ "msg": "wrong input,login failed ,User already exist, please login" })
                }
            });
        } else {
            res.status(401).send({ "msg": "login failed,user is not present" })

        }
    } catch (error) {
        res.status(401).send({ "msg": "error occourd while login " })

    }
})

// update for doctor

doctorRouter.patch("/update/:postID",async(req,res)=>{
    const{postID}=req.params
    const payload=req.body
    try {
        await user.modelModel.findByIdAndUpdate({_id:postID},payload)
        res.status(200).send("Updated")
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
    
})

// Delete for doctor
doctorRouter.delete("/delete/:postID",async(req,res)=>{
    const {postID}=req.params
    try {
        await DoctorModel.findByIdAndDelete({_id:postID})
        res.status(200).send({"msg":"deleted"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
        
    }
   
})

module.exports= {
    doctorRouter
}