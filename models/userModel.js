const mongoose = require('mongoose');


const userSchema  =  new mongoose.Schema({
    UserName:{
       type: String,
       unique:true,
       required:true,
    },
    Password:{
    type:String,
    required:true,
    select:false
    },
    userProfile:{
        type:String,
        required:false
    },
    email:{
        type:String
    },
    Phone:{
        type:Number
    }

})

module.exports = mongoose.model("users",userSchema);