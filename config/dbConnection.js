const mongoose = require('mongoose')
const connectionString =  process.env.CONNECTION_STRING;
const connectDb = ()=> {
    mongoose.connect(connectionString,{
    dbName:"backend",
}).then(()=>console.log("Database connected")).catch((e) => console.log(e));
}

module.exports = connectDb ;