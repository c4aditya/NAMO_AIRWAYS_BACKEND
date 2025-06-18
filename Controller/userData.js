// getting user data from data base 

const user_data = require("../Models/user");

async function getAllUserData(req , res) {

    try{

        const storeData = await user_data.find();

        // if(!storeData){
        //     console.log("Your Database is empty")
        // }

        res.status(200).json({
            success:true,
            message:"All the data is print in",
            data:storeData,
        })

    }catch(error){
        
        res.status(500).json({
            sucess:false,
            message:"geting error while fetching the data form the data base ",
            data:error
        })

    }
    
}

module.exports = getAllUserData;


