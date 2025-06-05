const ApplyForm = require("../Models/user")

async function applyNow(req,res){
    try{

        const {fullName , email} = req.body
        // it is an hairechy to send any file form the frontend req.file.which name we use form sending an file 
        const high = req.files.highSchool;
        const inter = req.files.inter;
        console.log(high)

        // storing the files in server 

        if(!fullName){
            return res.status(500).json({
                sucess:false,
                message:"Please fill all the feilds"
            })
        }
        // high school file extension save 

         let highSchool = high.name.split('.').pop();
         let path = __dirname + "/hignSchoolResults/" + Date.now() + "." + highSchool;
 
         high.mv(path,(error)=>{
            console.log(error)
        })

        // inter result path 
        let interClass = inter.name.split('.').pop();
        let interPath = __dirname + "/interResultFiles/" + Date.now() + "." + interClass;
         inter.mv(interPath,(error)=>{
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
             email,
             high:path,
             inter:interPath 
           
            
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