const mongoose = require("mongoose")


const user_schema = mongoose.Schema({
    fullName:{        
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
   
})

module.exports = mongoose.model("user" , user_schema);