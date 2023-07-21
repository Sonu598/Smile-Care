const {Router}=require("express");
const {PaidModel}=require("../model/paidUserModel");

const paiduserRouter=Router();

paiduserRouter.get("/",async(req,res)=>{
    try{
        const data= await PaidModel.find();
        res.status(200).send({"data":data});

    }catch(err){
        res.status(401).send({"error":err})
    }
})

paiduserRouter.get("/total-earning",async(req,res)=>{
    try{
        const total = await PaidModel.aggregate([
            {
              $group: {
                _id: null,
                total: { $sum: "$price" }
              }
            }
          ])
        res.status(200).send({"data":data});

    }catch(err){
        res.status(401).send({"error":err})
    }
})

module.exports={paiduserRouter}