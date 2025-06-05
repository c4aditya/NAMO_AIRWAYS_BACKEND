const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
require("dotenv").config();
const user_schema = mongoose.Schema({
    fullName:{        
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    // fatherName:{        
    //     type:String,
    //     required:true,
    // },
    // email:{
    //      type:String,
    //     required:true,
    // },   
    // phoneNumber:{
    //     type:Number,
    //     required:true
    // },
    // birth:{
    //     type:Date,
    //     required:true
    // },
    // gender:{
    //     enum:["Male" ,"Female", "Not Disclosed"],
    // },
    // password:{
    //     type:String,
    //     required:true,
    // },
    // confirmPassword:{
    //     type:String,
    //     required:true,
    // },

    // education:{
    //     type:String,
    //     required:true,
    // },
    // address:{
    //     type:String,
    //      required:true,
    // },
    // appliedFor:{
    //     type:String,
    // },
    // addharNumber:{
    //     type:Number,
    //     required:true,
    // },
    high:{
         type:String,
    },
    inter:{
        type:String
    }
   
})

// create middle ware for sending an email 

user_schema.post("save", async function(doc){

    try{
        // entery is created in the databse here we called it doc 
        // console.log(doc)
        // create transporter 

        let transporter = nodemailer.createTransport({
            service:"Gmail",
            host:process.env.host,

            auth:{
                 user:process.env.mailUser,
                 pass:process.env.mailPass,
            }
        })

        let info = await transporter.sendMail({
           
          from: `Namo Airways <${process.env.mailUser}>`, // Valid email format

           to: doc.email,
           subject:"New Career Details",
           html:`<h1>You get the email</h1>`

        })

      
        
       console.log(info);

    }catch(error){
       
        console.log(error)

    }
})
module.exports = mongoose.model("user" , user_schema);