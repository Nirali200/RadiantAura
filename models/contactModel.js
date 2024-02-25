const mongoose = require('mongoose');

const contactSchema  =  new mongoose.Schema({
    name:String,
    email:String,
    reviews:String, 
});

const contactus = mongoose.model("contactus",contactSchema)

module.exports = contactus;
