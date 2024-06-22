const  User = require ("../models/userModel")
const bcrypt= require("bcryptjs")

exports.passwordreset_form_post= function(req,res,next){

    if(req.body.password===""){
        User.findOne({
            email:req.body.email
        }).exec().then(user=>{
            if(user){
     
    
                return res.status(201).send({message:"Please Enter your New Password ", color:"red", type:"createpassword" })
            }  
            else{
        
                return res.status(200).send({message:"Email not Found, Please Sign Up", color: "red", type:"invalid"})
        
            
        }
        }).catch(err => console.error(`An error occured while looking at the database${err}`))
    
    


    }
    else{

        User.findOne({
            email:req.body.email
        }).exec().then(user=>{
            if(user){
                user.password=bcrypt.hashSync(req.body.password);

                user.save().then(doc=>{console.log(doc)})



                return res.status(201).send({message:"Password Changed Successfully, Please Login", color:"green", type:"passwordchanged" })
            }  
            else{
        
                return res.status(200).send({message:"Email not Found, Please Sign Up", color: "red", type:"invalid"})
        
            
        }
        }).catch(err => console.error(`An error occured while looking at the database${err}`))
    
    
    }



}