require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./Config/dbConnection'); 
const router = require('./Routes/routes');

const ServerApp = express();
const PORT = process.env.PORT || 3000;

ServerApp.use(cors());
ServerApp.use(express.json());
ServerApp.use(router);  

ServerApp.get('/', (req, res) => {
    res.send(`<h1>Portfolio Server Started Running</h1>`);
});

ServerApp.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
