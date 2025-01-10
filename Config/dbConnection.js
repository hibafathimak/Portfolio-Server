const mongoose = require('mongoose')

mongoose.connect(process.env.DB_STRING).then((res)=>{
    console.log("MongoDb Connection Sucess");   
}).catch((err)=>{
    console.log("MongoDb Connection Failed");
    console.log(err); 
})