require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./Config/dbConnection')
const router = require('./Routes/routes')

const ServerApp = express()

const PORT =3000 || process.env.PORT

ServerApp.use(cors())
ServerApp.use(express.json())
ServerApp.use(router)
ServerApp.use('/uploads',express.static('./uploads'))


ServerApp.listen(PORT,()=>{
    console.log("Server Started Running");
})

ServerApp.get('/',(req,res)=>{
    res.send(`<h1>Portfolio Server Started Running</h1>`)
})