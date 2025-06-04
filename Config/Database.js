const mongoose = require("mongoose")
require("dotenv").config();
async function db_connect(){

    try{
     await mongoose.connect(process.env.DB_URL)
      console.log("The database is Connected ")
    }catch(error){
          console.log("There is an error occcur during making database connection" , error)
    }
}

module.exports = db_connect