const ApplyForm = require("../Models/user")

async function applyNow(req,res){
    try{

        const {fullName ,fatherName, email,phoneNumber,birth,gender,password,confirmPassword, education,address,appliedFor, addharNumber} = req.body
        
        if(!fullName || !fatherName || !email || ! phoneNumber || !birth || !gender || !password || !confirmPassword || !education || !address || !appliedFor || !addharNumber){
            return res.status(500).json({
                sucess:false,
                message:"Please fill all the feilds"
            })
        }

        if(password == !confirmPassword){
            return res.status(500).json({
                success:false,
                message:"Password is not match"
            })
        }

        // if all good then make a db entry 
        const userData = await ApplyForm.create({
            fullName ,
            fatherName,
             email,
             phoneNumber,
             birth,
             gender,
             password,
             confirmPassword,
             education,
             address,
             appliedFor, 
             addharNumber
        })

        console.log(userData)
        res.status(200).json({
            success:true,
            message:"Your Data has been send "
        })


    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error Getting while Submiting the form "
        })

    }
}

module.exports = applyNow;