const express = require('express');
const mongoose = require('mongoose')
const path = require('path') 
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcript = require('bcrypt');



const app = express();


mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName:"backend",
}).then(()=>console.log("Database connected")).catch((e) => console.log(e));


const messageSchema  =  new mongoose.Schema({
    name:String,
    email:String,
    reviews:String
})

const contactus = mongoose.model("contactus",messageSchema);


const userSchema  =  new mongoose.Schema({
    UserName:String,
    Password:String
})

const users = mongoose.model("users",userSchema);

app.use("/css",express.static(path.join(path.resolve(),"/css")))
app.use("/images",express.static(path.join(path.resolve(),"/images")))
app.use("/js",express.static(path.join(path.resolve(),"/js")))
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser());
app.set("view engine","ejs")

app.get("/home",(req,res) =>{
    res.render("Home");
})

app.post('/contact',(req,res)=>{
    const {name,email,reviews} = req.body;
    contactus.create({name,email,reviews});
    res.redirect('/contact');
})

app.get("/contact",(req,res) => {
    res.render("Contact");
})

app.get('/login',(req,res) =>{
    res.render("Login");
})

app.get('/register',(req,res) =>{
    res.render("Register");
})


app.post('/register',async(req,res) =>{
    const { UserName , Password} = req.body;

    let user = await users.findOne({UserName});
    if(user){
        return  res.redirect('/login');
    }
    const hashPassword = await bcript.hash(Password,10);
    

    user = await users.create({UserName,Password : hashPassword});
    const token = jwt.sign({_id:user._id},"parthnirali")

    res.cookie("token",token,{
        httpOnly:true,
        expires: new Date(Date.now() + 60*1000), 
    })
    res.redirect('/');
    return res.render("LogOut",{UserName});
})

const isAuthenticat = async(req,res,next) =>{
    const {token} = req.cookies;
    if(token){
        const decode  = jwt.verify(token,"parthnirali");
        req.user = await users.findById(decode._id);
        next();
    }
    else{
        res.render("Login");
    }
}

app.get('/',isAuthenticat,(req,res) => {
    const {UserName} = req.user;
    res.render("LogOut",{UserName});
})


app.post('/login',async(req,res) => {
    
    const { UserName , Password} = req.body;

    let user = await users.findOne({UserName});
    if(!user){
     return res.redirect("/register");
    }

    const isMatch = await bcript.compare(Password,user.Password);
    
    if(!isMatch){ 
    return res.render("Login",{UserName, message: "Incorrect Password !!!" });
    }

    // user = await users.create({UserName,Password})

    const token = jwt.sign({_id:user._id},"parthnirali")

    res.cookie("token",token,{
        httpOnly:true,
        expires: new Date(Date.now() + 60*1000), 
    })
    res.redirect('/');
})

app.get("/logOut",(req,res) => {
    res.cookie("token",null,{
        httpOnly:true,
        expires: new Date(Date.now()), 
    })
    res.redirect('/');
})


app.listen(5500,()=>{
    console.log("Server is listening on port 5500");
})