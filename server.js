const express = require("express");
const fileupload = require("express-fileupload")
const app = express();

require("dotenv").config()

const PORT = process.env.PORT || 5700

// adding body parser 

app.use(express.json());

// adding middleware for sending the files 


app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
// adding  routes
const route = require("./Routes/form")
app.use("/api/v1",route)
// starting a server

app.listen(PORT ,(req ,res)=>{    
     console.log(`Your server is Started on ${PORT}`)
})

//make a connection with cloudinery 

const cloudinaryConnect = require("./Config/Cloudinary")

cloudinaryConnect();
// make an databse connection 

const db_connect = require("./Config/Database");
const fileUpload = require("express-fileupload");

db_connect();