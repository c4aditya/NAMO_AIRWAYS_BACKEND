const express = require("express");

const app = express();

require("dotenv").config()

const PORT = process.env.PORT || 5700

// adding body parser 

app.use(express.json());

// adding body parsher for file uploade

app.use()
// adding  routes
const route = require("./Routes/form")
app.use("/api/v1",route)
// starting a server

app.listen(PORT ,(req ,res)=>{    
     console.log(`Your server is Started on ${PORT}`)
})

// make an databse connection 

const db_connect = require("./Config/Database")

db_connect();