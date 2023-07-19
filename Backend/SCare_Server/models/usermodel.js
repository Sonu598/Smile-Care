const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    department:{type:String,default:"Dentist"},
    profilePic:{type:String,
                default:"https://img.freepik.com/premium-vector/businessman-avatar-cartoon-character-profile_18591-50581.jpg?w=2000"
    },
    description:{type:String},
    fees : {type:Number},
    deleted : {type:Boolean,default:false},
    role: {
        type: String,
        enum: ['Doctor', 'Patient', 'Admin']
    }
},{timestamps:true,versionKey:false});

const UserModel = mongoose.model('users', userSchema);

module.exports = {
    UserModel
}