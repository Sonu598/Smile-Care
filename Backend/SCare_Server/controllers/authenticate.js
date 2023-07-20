const {UserModel} = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {blacklistModel} = require('../models/blacklistmodel');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const logoutLogic = async (req, res) => {
    try{
        let cookie = req.cookies.token;
        let newToken = await blacklistModel({token: cookie});
        await newToken.save();
        res.clearCookie('token');
        res.status(200).send({msg: 'Logout Successful'});
    }catch(err){
        console.log(err.message);
        res.status(500).send({msg: err.message});
    }
}
const googleOauth = (Role)=>{
    return async (req, res)=>{
        let isUserValid = await UserModel.findOne({email: req.user._json.email});
        if (isUserValid && isUserValid.role === Role) {
            const access_token = jwt.sign({ userId: isUserValid._id }, 'Secret', { expiresIn: '4h' });
            res.cookie('token', access_token, {maxAge: 4*60*60*1000})
            const queryString = JSON.stringify(access_token);
            res.redirect(`http://127.0.0.1:5500/Frontend/index.html?${queryString}`);
        }
        else{
            const pass = uuidv4();
            const hashedPass = await bcrypt.hash(pass, Number(5));
            const newUser = new UserModel({name: req.user._json.name, email: req.user._json.email, role: 'Patient', password: hashedPass, age: 18});
            await newUser.save();
            const accessToken = jwt.sign({userId: newUser._id}, 'Secret', {expiresIn: '4h'});
            const queryString = JSON.stringify(accessToken);
            res.redirect(`http://127.0.0.1:5500/Frontend/index.html?${queryString}`);
        }
    }
}

module.exports = {
    logoutLogic, googleOauth
};
