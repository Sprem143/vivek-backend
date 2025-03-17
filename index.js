const express= require('express');
const db= require('./db');
require('dotenv').config();
const PORT= process.env.PORT || 10000
const app= express();
const cors = require('cors')
const router = require('./router')
const path = require("path");
db();
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/', router);

app.listen(PORT, (err)=>{
    if(err) console.log(err);
    console.log(`Server is live on ${PORT}`)
})
 