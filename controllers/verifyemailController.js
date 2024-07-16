require("dotenv").config();
const Mail = require("nodemailer/lib/mailer")
// const User=require("../models/userModel")
// const Refreshtoken=require("../models/refreshtoken");
const jwt=require("jsonwebtoken")
// const secret= require("../authConfig");
// const mongoose=require("mongoose");

const dbConnection=require("../databaseSchemas/connectDatabase")




exports.verifyEmail=(req, res,next)=>{
    console.log("beginning of the verify emmail process " + process.env.SECRET)

    var dbconn=dbConnection()

    console.log("access token/ verification code shit")
    console.log(req.params.verificationcode)



    var userData={status:"verified"}
    var checkuser =`SELECT * FROM users WHERE user_id="${req.params.verificationcode}";`;
    var updateuser=`UPDATE users SET? WHERE user_id="${req.params.verificationcode}"`


    dbconn.query(checkuser, function(err, results){
        if(err){
            console.log(err);
        }
        else{
            var userResults=results[0];
            var user=userResults


            const refreshTokenSign=jwt.sign({exp:Math.floor(Date.now()/1000 + (6*30*24*60*60)),user_id:req.params.verificationcode, user:user }, process.env.REFRESH_TOKEN_SECRET)   
            const accessTokenSign=jwt.sign({exp:Math.floor(Date.now()/1000)+ (24*60*60), user_id:req.params.verificationcode, user:user}, process.env.ACCESS_TOKEN_SECRET)  



            const checkaccesstokens=`SELECT * FROM accesstokens WHERE user_id="${req.params.verificationcode}";`
            const checkrefreshtokens=`SELECT * FROM refreshtokens WHERE user_id="${req.params.verificationcode}";`
            
            const accessToken={user_id:req.params.verificationcode, accesstoken:accessTokenSign}
        
            const refreshToken={user_id:req.params.verificationcode, refreshtoken:refreshTokenSign}
        
            console.log(accessToken.accesstoken)
            console.log(refreshToken.refreshtoken)
            


            if(results.length >0){
                dbconn.query(updateuser, userData ,function(err, results){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(results);
                        dbconn.query(checkaccesstokens, (err,results,fields)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log(results);
                                dbconn.query(`INSERT INTO accesstokens SET ?`, accessToken, (err,results,fields)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        console.log(results)
                                    }
                                })        
                            }
                        })

                        dbconn.query(checkrefreshtokens, (err,results,fields)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log(results)
                                dbconn.query(`INSERT INTO refreshtokens SET ?`, refreshToken, (err,results,fields)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        console.log(results)
                                    }
                                })                    
                            }
                        })

                        res.status(201).send({message: "user has been successfully updated", accesstokens:accessToken.accesstoken, refreshtokens:refreshToken.refreshtoken})
                        

                    }
                })
            }
            else{
                console.log("User already exists Please login")
                res.status(200).send({message:"User alreadyexists, please login! "})
            }
        }
    })



}







