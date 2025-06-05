// importing the cloudinary

const cloudinary = require("cloudinary").v2;
require("dotenv").config();
function cloudinaryConnect(){

    try{

        cloudinary.config({
            cloud_name :process.env.cloud_name,
            api_key:process.env.api_key,
            api_secret:process.env.api_secret

        })

        console.log("The cloudinary is connected");

    }catch(error){

        console.log("Getting Error While Connecting the Cloudniary", error);

    }
}

module.exports = cloudinaryConnect;