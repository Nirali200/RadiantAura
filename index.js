const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const connectDb = require('./config/dbConnection.js');
const path = require('path') 
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT;
connectDb();


app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use("/css",express.static(path.join(path.resolve(),"/css")));
app.use("/userImages",express.static(path.join(path.resolve(),"/userImages")));
app.use("/images",express.static(path.join(path.resolve(),"/images")));
app.use("/js",express.static(path.join(path.resolve(),"/js")));
app.use("/JSON",express.static(path.join(path.resolve(),"/JSON")));
app.set("view engine","ejs");
app.use(require('./routs/contactRout.js'))
app.use(require('./routs/userRout.js'));

app.get("/",(req,res) =>{ 
    res.render("Home");
})

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})