const User=require("../models/userModel")
const role=require("../models/rolesModel")
const jwt= require("jsonwebtoken")

const authconfig= require("../authConfig")
const bcrypt = require("bcryptjs")
const secret=authconfig.secret
// console.log(secret)

// jwt.sign({exp: Math.floor(Date.now()/1000) + 2*60}, secret)

// exports.login_form_get= function(req,res, next){


// }

exports.login_form_post=function(req,res,next){

    User.findOne({
        email:req.body.email
    }).exec().then(user=>{
        if(user){
            const validPassword= bcrypt.compareSync(
                req.body.password,
                user.password
            )

            const isVerifiedEmail=()=>{
                if(user.status==="pending"){
                    return false
                }
                else{
                    return true
                }
               
            }
          
          const verified=isVerifiedEmail()
            console.log(verified);
            console.log(user);
            if(!validPassword){
                return res.status(200).send({message: "Invalid Password or Email", accesstoken:null, color: "red", type:"invaliduser"})
            }
            else{
                if(!verified){
                    return res.status(200).send({message: "Unverified Email, Please Check you Email to Verify your Account", color: "red", type:"unverified"})
                
                }else{    
                    const token=jwt.sign({exp:Math.floor(Date.now()/1000)+ (60*2), user:user}, process.env.SECRET)   
                    const refreshtoken=jwt.sign({exp:Math.floor(Date.now()/1000)+ (60*5), user:user}, process.env.SECRET)
                    console.log(user)

                    return res.status(201).send({
                        // email:user.email,
                        accesstoken:token, 
                        type:"successlogin",
                        message:"Login Success, wait as we redirect you to the next page",
                        refreshtoken:refreshtoken,
                        // accesstoken: token, 
                        color:"green"
                    })
                }   
            }
        }  
        else{
            return res.status(200).send({message:"Invalidd Email or Password", color: "red", type:"invaliduser"})  
    }
    }).catch(err => console.error(`An error occured while looking at the database for login${err}`))
}