const contactus = require('../models/contactModel.js');
const users = require('../models/userModel');
const jwt = require('jsonwebtoken');

const storeContacts =  async (req,res)=>{
    const { name,email,reviews } = req.body;
    await contactus.create( {name,email,reviews} );
    res.redirect('/contact');
}

const checkAuth = async(req,res) => {
    const {token} = req.cookies;
    let user;
    if(token){
        let profile = true;
        const decode  = jwt.verify(token,process.env.SECRET_STRING);
        user = await users.findById(decode._id);
        const {Image} = user;
        return res.render("Contact.ejs",{profile,Image});   
    }
    res.redirect('/');
}



module.exports = {storeContacts,checkAuth};