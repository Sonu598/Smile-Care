const mongoose = require('mongoose');
require('dotenv').config();

const connection = () =>{
    try{
        mongoose.connect(process.env.mongoURL);
        console.log('Connected to the Database');
    }catch(err){
        console.log('Database connection failuer');
    }
}

module.exports = {
    connection
}
