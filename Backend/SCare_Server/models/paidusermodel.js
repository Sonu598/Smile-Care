const mongoose=require('mongoose')

const paiduserSchema= mongoose.Schema({
    plan:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
});

const PaidModel= mongoose.model("paid-user",paiduserSchema);

module.exports={PaidModel}
