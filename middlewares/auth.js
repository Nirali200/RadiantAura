const cookieParser = require('cookie-parser');
const users = require('../models/userModel');
const jwt = require('jsonwebtoken');    

const isAuth = async(req,res,next) =>{
    const {token} = req.cookies;
    if(token){
        const decode  = jwt.verify(token,process.env.SECRET_STRING);
        req.user = await users.findById(decode._id);
        next();
    }
    else{
        res.render('Home.ejs');
    }
}


const isAuthCon = async(req,res,next) =>{
    const {token} = req.cookies;
    if(token){
        const decode  = jwt.verify(token,process.env.SECRET_STRING);
        req.user = await users.findById(decode._id);
        next();
    }
    else{
        res.render("Contact");
    }
}



module.exports  =  {isAuth,isAuthCon} ;