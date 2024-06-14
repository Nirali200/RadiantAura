// const mongoose = require('mongoose')
// const connectionString =  "";
// const connectDb = ()=> {
//     mongoose.connect(connectionString).then(()=>console.log("Database connected")).catch((e) => console.log(e));
// }

// module.exports = connectDb ;

// import mongoose from "mongoose";
const mongoose = require('mongoose')

const connectDb = async() => {
    try{
        const connect = await mongoose.connect("mongodb+srv://darjinirali08:fvGy6pR49SD9c979@RadiantAura.5z5p4yp.mongodb.net/?retryWrites=true&w=majority&appName=User",{useNewUrlParser: true, useUnifiedTopology:true})
        console.log(
            "Database connected: ",
            connect.connection.host,
            connect.connection.name
        )
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDb ;