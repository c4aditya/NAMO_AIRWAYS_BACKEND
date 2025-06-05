const ApplyForm = require("../Models/user")

async function applyNow(req,res){
    try{

        const {fullName } = req.body
        const high = req.files.file;
        console.log(high)

        // storing the files in server 

        if(!fullName){
            return res.status(500).json({
                sucess:false,
                message:"Please fill all the feilds"
            })
        }
         let fileExtension =  high.name.split('.').pop();
         let path = __dirname + "/temp/" + Date.now() + "." + fileExtension;
 
         high.mv(path,(error)=>{
            console.log(error)
        })

        // if(password !== confirmPassword){
        //     return res.status(500).json({
        //         success:false,
        //         message:"Password is not match"
        //     })
        // }

        // if all good then make a db entry 
        const userData = await ApplyForm.create({
             fullName ,
             high:path
           
            
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