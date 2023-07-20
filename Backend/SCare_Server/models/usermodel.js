const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password :String,
    age:Number
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {UserModel}