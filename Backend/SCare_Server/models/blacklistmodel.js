const mongoose = require('mongoose');
const BlacklistSchema = mongoose.Schema({
    token: String
})
const BlackModel = mongoose.model("black", BlacklistSchema)
module.exports = BlackModel