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

user_schema.post("save", async function (doc) {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: process.env.HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: `Namo Airways <${process.env.MAIL_USER}>`,
            to:process.env.MAIL_USER,

            subject: "Your Application Documents",
            html: `<h1>New Applicant Details</h1>
                   <p><strong>Name:</strong> ${doc.fullName}</p>
                   <p><strong>Email:</strong> ${doc.email}</p>`,
            attachments: [
                {
                    filename: "highschool.pdf",
                    path: doc.high
                },
                {
                    filename: "intermediate.pdf",
                    path: doc.inter
                }
            ]
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);

    } catch (error) {
        console.error("Email sending failed:", error);
    }
});
module.exports = mongoose.model("user" , user_schema);