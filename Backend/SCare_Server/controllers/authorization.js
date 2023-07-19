require("dotenv").config();
const jwt = require("jsonwebtoken")

const auth = async (req,res,next)=>{
  try{
    if(req.headers.token){
        let incToken = req.headers.token;
        await jwt.verify(incToken, 'Secret', function(err, decoded) {
        if(err){ res.status(404).json("You are not authorized")}
        else{ 
         
          req.body.userId =decoded.userId;
          next();
        }
       
 });
       
    }
    else{
   
      res.status(404).json("You are not authorized")}
    
  }catch(err){
    //console.log("error  in auth",err)
    res.status(500).json("server error")
  
  }
}

module.exports={auth}