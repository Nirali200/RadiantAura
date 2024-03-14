const cookieParser = require('cookie-parser');
const users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcript = require('bcrypt');
const nodemailer = require('nodemailer');
const parser = require('body-parser');

let sotp = null;


const getRegistration =  (req,res) =>{
        res.render("Register");
}

const postRegistration = async(req,res) =>{
    const { UserName , email , Phone, Password } = req.body;
    const isVerified = false;
    
    let user = await users.findOne({UserName});
    if(user){
        return  res.render("Register",{message :"User Allready Exits"});
    }
    const hashPassword = await bcript.hash(Password,10);
    
    
    user = await users.create({UserName,email,Phone,Password : hashPassword,isVerified});
    const token = jwt.sign({_id:user._id},process.env.SECRET_STRING)
    
    res.cookie("token",token,{
        httpOnly:true,
        expires: new Date(Date.now() + 3600*1000), 
    })
    
    res.redirect('/verifyemail');
}

const sendOtp = async(req,res) =>{
    const {token} = req.cookies;
    let user;
    if(token){
        const decode  = jwt.verify(token,process.env.SECRET_STRING);
        user = await users.findById(decode._id);
        const {UserName,email,_id} = user;
        sendVerifyMail(UserName,email,_id);
        return res.render('EmailVer.ejs',{message:"Otp has been Sended to your email,please check!"});
    }

    return res.redirect('/verifyemail');
    
}

const sendVerifyMail = async(userName,email,user_id) => {

    try{
        
        const transPorter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            tls:true,
            auth:{
                user:"darjinirali08@gmail.com",
                pass:'kkgb icwx xmny yydp'
            }
        })

        sotp = Math.floor(1000 + Math.random() * 1000);
        
        const mailOptions = {
            from:"darjinirali08@gmail.com",
            to:email,
            subject:'For verification mail',
            html:'<p>Hii '+userName+',Your OTP is '+sotp+'. </p>',
        }
        transPorter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            }
            else{
                console.log("Email has been sent :-",info.response);
            }
        })

    }catch(error) {
        console.log(error);
    }

}

const postVerify = async(req,res) =>{
        let otp = req.body.otp1;
         otp = otp + req.body.otp2;
         otp = otp + req.body.otp3;
         otp = otp + req.body.otp4;
         otp = parseInt(otp);
        if(otp == sotp)
        return res.redirect('/');
    return res.render('EmailVer.ejs',{message:'otp not matches!!'});
        
}

const verifyMail = async(req,res)=>{
    try{
       const updateInfo = await users.updateOne({_id:req.query.id},{$set:{ isVerified:true }});
       console.log(updateInfo);
       res.render("EmailVer.ejs");  
    }catch(error){
        console.log(error);
    }
}

const getLogin = (req,res) =>{
    res.render("Login");
}; 


const checkAuth = (req,res) => {
    const {UserName,Image} = req.user;
    let profile = true;
    res.render("Home.ejs",{UserName,profile,Image});
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
        const {UserName,email,Phone,Image} = user;
        return res.render('Edit.ejs',{UserName,email,Phone,Image});
    }
    res.redirect('/');
}

const logedIn = async (req,res) =>{
    const {token} = req.cookies;
    let user;
    if(token){
        const decode  = jwt.verify(token,process.env.SECRET_STRING);
        user = await users.findById(decode._id);
        const {UserName,email,Phone,Image} = user;
        return res.render('LogedIn.ejs',{UserName,email,Phone,Image});
    }
    res.redirect('/');
}


const editPost = async(req,res) =>{
    const {token} = req.cookies;
    let user;
    if(token){
        const decode  = jwt.verify(token,process.env.SECRET_STRING);
        user = await users.findById(decode._id).select("+Password");
        const {UserName,email,Phone,Password,Image} = user;
        const {userName,phone,password} = req.body;
        const isMatch = await bcript.compare(password,Password);
        if(!isMatch){
            console.log(Image);
            return res.render("Edit",{UserName,email,Phone,Image,message: "Incorrect Password !!!" });
        }
        await users.findByIdAndUpdate({_id:user._id},{$set:{
            Image : req.file ? req.file.filename : user.Image,
            UserName : userName || user.UserName,
            Phone : phone || user.Phone
        }});
        return res.redirect('/logined');
    }
    res.redirect('/');
}


const getFaq =async(req,res) =>{
    const {token} = req.cookies;
    let user;
    let profile = false;
    if(token){
         profile = true;
        const decode  = jwt.verify(token,process.env.SECRET_STRING);
        user = await users.findById(decode._id);
        const {Image} = user;
        return res.render("Faq.ejs",{profile,Image});
    }
    return res.render("Faq.ejs",{profile});
}

const getEmailVer = async(req,res) =>{
    const {token} = req.cookies;
    let user;
    let profile = false;
    if(token){
         profile = true;
        const decode  = jwt.verify(token,process.env.SECRET_STRING);
        user = await users.findById(decode._id);
        const {Image} = user;
        return res.render("EmailVer.ejs",{profile,Image});
    }
    return res.render("EmailVer.ejs",{profile});
}

module.exports = { getRegistration,postRegistration,getLogin,checkAuth,postLogin,logOut,logedIn,edit,editPost,getFaq,getEmailVer,verifyMail,postVerify,sendOtp };