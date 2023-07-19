let express=require("express");
let doctorRouter=express.Router();
const { registerLogic, loginLogic } = require('../controllers/authenticate');
const UserModel = require('../models/usermodel');


doctorRouter.get("/allDocotor", async (req,res)=>{
    try {
      let list = await UserModel.find({role: 'Doctor'});
      res.status(200).send(list);
    } catch (err) {
      console.log('/doctor/allDoctor: ',err.message);
      res.status(500).send({msg: err.message});
    }
})

doctorRouter.post('/register', registerLogic('Doctor'));

doctorRouter.post('/login', loginLogic('Doctor'));


doctorRouter.post("/newdr",async(req,res)=>{
  try {
      const blog= new UserModel(req.body)
      await blog.save()
      res.status(400).send("New Docotor register")
      
  }catch(error){
      res.status(400).send({"msg":error.message})
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
        await user.model.findByIdAndDelete({_id:postID})
        res.status(200).send({"msg":"deleted"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
        
    }
   
})

module.exports= {
    doctorRouter
}