const users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcript = require('bcrypt');


const getRegistration =  (req,res) =>{
        res.render("Register");
}

const postRegistration = async(req,res) =>{
    const { UserName , Password} = req.body;
    
    let user = await users.findOne({UserName});
    if(user){
        return  res.render("Register",{message :"User Allready Exits"});
    }
    const hashPassword = await bcript.hash(Password,10);
    
    
    user = await users.create({UserName,Password : hashPassword});
    const token = jwt.sign({_id:user._id},process.env.SECRET_STRING)
    
    res.cookie("token",token,{
        httpOnly:true,
        expires: new Date(Date.now() + 60*1000), 
    })
    res.redirect('/');
    return res.render("LogOut",{UserName});
}

const getLogin = (req,res) =>{
    res.render("Login");
}; 


const checkAuth = (req,res) => {
    const {UserName} = req.user;
    res.render("LogOut",{UserName});
}


const postLogin = async(req,res) => {
    
    const { UserName , Password } = req.body;

    let user = await users.findOne({UserName}).select("+Password");

    if(!user){
     return res.redirect("/register");
    }

    const isMatch = await bcript.compare(Password,user.Password);
    
    if(!isMatch){ 
    return res.render("Login",{UserName, message: "Incorrect Password !!!" });
    }

    const token = jwt.sign({_id:user._id},process.env.SECRET_STRING);

    res.cookie("token",token,{
        httpOnly:true,
        expires: new Date(Date.now() + 60*1000), 
    })
    res.redirect('/');
}


const logOut = (req,res) => {
    res.cookie("token",null,{
        httpOnly:true,
        expires: new Date(Date.now()), 
    })
    res.redirect('/');
}


module.exports = { getRegistration,postRegistration,getLogin,checkAuth,postLogin,logOut }