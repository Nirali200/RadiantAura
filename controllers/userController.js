const cookieParser = require('cookie-parser');
const users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcript = require('bcrypt');


const getRegistration =  (req,res) =>{
        res.render("Register");
}

const postRegistration = async(req,res) =>{
    const { UserName , email , Phone, Password} = req.body;
    
    let user = await users.findOne({UserName});
    if(user){
        return  res.render("Register",{message :"User Allready Exits"});
    }
    const hashPassword = await bcript.hash(Password,10);
    
    
    user = await users.create({UserName,email,Phone,Password : hashPassword});
    const token = jwt.sign({_id:user._id},process.env.SECRET_STRING)
    
    res.cookie("token",token,{
        httpOnly:true,
        expires: new Date(Date.now() + 3600*1000), 
    })
    res.redirect('/');
}

const getLogin = (req,res) =>{
    res.render("Login");
}; 


const checkAuth = (req,res) => {
    const {UserName} = req.user;
    let profile = true;
    res.render("Home.ejs",{UserName,profile});
}


const postLogin = async(req,res) => {
    
    const { UserName , Password } = req.body;

    let user = await users.findOne({UserName}).select("+Password");

    if(!user){
     return res.render("Login.ejs",{message:"User Not Exist!!"});
    }

    const isMatch = await bcript.compare(Password,user.Password);
    
    if(!isMatch){ 
    return res.render("Login",{UserName, message: "Incorrect Password !!!" });
    }

    const token = jwt.sign({_id:user._id},process.env.SECRET_STRING);

    res.cookie("token",token,{
        httpOnly:true,
        expires: new Date(Date.now() + 3600*1000), 
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

const edit = async(req,res) =>{
    const {token} = req.cookies;
    let user;
    if(token){
        const decode  = jwt.verify(token,process.env.SECRET_STRING);
        user = await users.findById(decode._id);
        const {UserName,email,Phone} = user;
        return res.render('Edit.ejs',{UserName,email,Phone});
    }
    res.redirect('/');
}

const logedIn = async (req,res) =>{
    const {token} = req.cookies;
    let user;
    if(token){
        const decode  = jwt.verify(token,process.env.SECRET_STRING);
        user = await users.findById(decode._id);
        const {UserName,email,Phone} = user;
        return res.render('LogedIn.ejs',{UserName,email,Phone});
    }
    res.redirect('/');
}


const editPost = async(req,res) =>{
    const {token} = req.cookies;
    let user;
    if(token){
        const decode  = jwt.verify(token,process.env.SECRET_STRING);
        user = await users.findById(decode._id).select("+Password");
        const {UserName,email,Phone,Password} = user;
        const {userName,phone,password} = req.body;
        const isMatch = await bcript.compare(password,Password);
        if(!isMatch){ 
            return res.render("Edit",{UserName,email,Phone,message: "Incorrect Password !!!" });
        }
        await users.findByIdAndUpdate({_id:user._id},{$set:{
            UserName : userName || user.UserName,
            Phone : phone || user.Phone,
            Image : req.file.filename || null
        }});
        return res.redirect('/edit');
    }
    res.redirect('/');
}


module.exports = { getRegistration,postRegistration,getLogin,checkAuth,postLogin,logOut,logedIn,edit,editPost };