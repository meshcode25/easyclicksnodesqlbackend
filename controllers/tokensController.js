const express=require("express");
const router=express.Router();

const jwt=require("jsonwebtoken");

const bcrypt=require("bcryptjs");


const dbconnection=require("../databaseSchemas/connectDatabase")



const dbconn=dbconnection();


exports.tokensControllerGet=(req,res,next)=>{

}



// const refreshTokenSign=jwt.sign({exp:Math.floor(Date.now()/1000 + (6*30*24*60*60)),user_id:req.params.verificationcode }, process.env.REFRESH_TOKEN_SECRET)   


exports.tokensControllerPost=(req,res,next)=>{
    console.log(req.body.refreshTokens)
    const refreshTokens=req.body.refreshTokens;
    
    
    
    jwt.verify(refreshTokens, process.env.REFRESH_TOKEN_SECRET).then((err,results)=>{
        if(err){                
            console.log(err);
            res.code(401).send("Tokens expired please login again");
        }
        else{
            console.log(results);
            console.log(results.user_id);
            const user_id=results.user_id;
            const accessTokenSign=jwt.sign({exp:Math.floor(Date.now()/1000)+ (24*60*60), user_id:user_id}, process.env.ACCESS_TOKEN_SECRET)  

            var updateaccesstoken={accesstoken:accessTokenSign}
            var updateaccesstokenquery=`UPDATE accesstokens SET ? WHERE user_id=${user_id}`

            dbconn.query(updateaccesstokenquery, updateaccesstoken, (err,results)=>{
                if(err){
                    console.log(err)

                }
                else{
                    console.log(results)
                    res.code(201).send({message:"new access token issued", accesstoken:accessTokenSign})
                }
            })
        }
    });


        

    


}
