
require("dotenv").config;
const jwt = require('jsonwebtoken');
const secret=process.env.SECRET
const Refreshtoken=("../models/refreshtoken")


module.exports = (req, res, next) =>{


    const Verifyuser=jwt.verify(req.headers.Authorization, process.env.SECRET, (err, decoded)=>{
        if(err){
            console.log("that shit is expired"); 

        }else{
            console.log(decoded)
            console.log("not expired jwt, amazing")
            console.log(decoded.user._id)
            return decoded;
        }
        
    });
    console.log(Verifyuser);
    // console.log(`Here is the Verification code now callled signin token ${req.params.verificationcode}`)
    // console.log(`verified user here ${Verifyuser}`);

    // verificationcode:req.params.verificationcode
    // User.findById(Verifyuser.user._id)
    // User.findOne({
    //     _id:mongoose.Types.ObjectId(Verifyuser.user._id)
    // })
    if(Verifyuser){

        User.findById(Verifyuser.user._id).exec().then((user)=>{
            if(!user){
                console.log("There is not such user found in the database, keep it Status: pending")
                return res.status(200).send({message: "user was not found the database"})
            }
    
            user.status="active"
            
            user.save((err)=>{
                console.log(user)
                if(err){
                    return res.status(500).send({message: err})
                }else{
                    console.log("User Email Verification Succcessfully completed, Valid Email")
                    return res.status(201).send({message:"User Email Successfully Verified, Valid Email"})
                }
    
            })
    
        }).catch(err =>{
    
            console.log("errors just found, what the fuck, what errors again")
           return console.error(err)
    
    
        })
    



    }
    else{
        console.log("That shit expired ages ago")
        next();
    }
}