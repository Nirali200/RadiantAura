const mongoose = require('mongoose');


const userSchema  =  new mongoose.Schema({
    UserName:String,
    Password:String
})

module.exports = mongoose.model("users",userSchema);