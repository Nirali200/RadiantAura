const cookieParser = require('cookie-parser');
const users = require('../models/userModel');
const jwt = require('jsonwebtoken');    

const isAuth = async(req,res,next) =>{
    const {token} = req.cookies;
    let profile = false;
    if(token){
        profile = true;
        const decode  = jwt.verify(token,process.env.SECRET_STRING);
        req.user = await users.findById(decode._id);
        next();
    }
    else{
        res.render('Home.ejs',{profile});
    }
}


const isAuthCon = async(req,res,next) =>{
    const {token} = req.cookies;
    let profile = false;
    if(token){
        profile = true;
        const decode  = jwt.verify(token,process.env.SECRET_STRING);
        req.user = await users.findById(decode._id);
        next();
    }
    else{
        res.render("Contact",{profile});
    }
}



module.exports  =  {isAuth,isAuthCon} ;