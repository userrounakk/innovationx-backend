require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const port = 3000;
const app = express();
app.use(express.urlencoded({extended: true}));


// Database connection
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Database connected");
}).catch((error) => {
    console.log("Database connection failed");
    console.error(error);
});
