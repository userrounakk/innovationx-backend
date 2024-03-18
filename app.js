require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes/routes');

const port = 3000;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Database connection
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Database connected");
    app.listen(port,()=>{
    console.log("Listening to port ",port);
    })
}).catch((error) => {
    console.log("Database connection failed");
    console.error(error);
});
// Routes connection
app.use('/',routes);

