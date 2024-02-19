const express = require('express');
const path = require('path') 
const app = express();

app.use(express.static(path.join(path.resolve(),"css")))
app.use(express.urlencoded({ extended: true}))
app.set("view engine","ejs")


app.get('/',(req,res) =>{
    res.render("Home");
})
app.post('/',(req,res)=>{
    console.log(req.body)
})

app.listen(5500,()=>{
    console.log("Server is listening on port 5500");
})