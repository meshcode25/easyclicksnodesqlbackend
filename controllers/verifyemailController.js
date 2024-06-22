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



    const refreshTokenSign=jwt.sign({exp:Math.floor(Date.now()/1000 + (6*30*24*60*60)),user_id:req.params.verificationcode }, process.env.REFRESH_TOKEN_SECRET)   
    const accessTokenSign=jwt.sign({exp:Math.floor(Date.now()/1000)+ (24*60*60), user_id:req.params.verificationcode}, process.env.ACCESS_TOKEN_SECRET)  
    
    const checkaccesstokens=`SELECT * FROM accesstokens WHERE user_id="${req.params.verificationcode}";`
    const checkrefreshtokens=`SELECT * FROM refreshtokens WHERE user_id="${req.params.verificationcode}";`
    
    const accessToken={user_id:req.params.verificationcode, accesstoken:accessTokenSign}

    const refreshToken={user_id:req.params.verificationcode, accesstoken:refreshTokenSign}

    var userData={status:"verified"}
    var checkuser =`SELECT * FROM users WHERE user_id="${req.params.verificationcode}";`;
    var updateuser=`UPDATE users SET? WHERE user_id="${req.params.verificationcode}"`


    dbconn.query(checkuser, function(err, results){
        if(err){
            console.log(err);
        }
        else{
            var userstatus=results[0];
            console.log(userstatus.status);
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

                        res.status(201).send({message: "user has been successfully updated", accesstokens:accessTokenSign, refreshtokens:refreshTokenSign})
                        

                    }
                })
            }
            else{
                console.log("User already exists Please login")
                res.status(404).send({message:"User alreadyexists, please login! "})
            }
        }
    })



}









    // jwt.verify(req.params.verificationcode, process.env.SECRET, (err, decoded)=>{
    //     if(err){
    //         if(err.name==="TokenExpiredError"){
    //             console.log("Access token expired shit is expired"); 
    //             jwt.verify(req.headers.refreshtoken, process.env.REFRESH_SECRET, (err, decode)=>{
    //                 if(err){
    //                     if(err.name==="TokenExpiredError"){
    //                         res.status(404).send({message:"Refresh Token Expired please login to generate new token"})
    //                         console.log("Refresh token expired, there is no way we can help you please login")
    //                         throw new Error(err)
    //                     }
    //                     else{
    //                         console.log("I just can't believe this shit for sure")
    //                         res.status(404).send({message:"invalid Refresh token, please login "})
    //                         throw new Error(err)
    //                     }
                        
    //                 }else{
    //                     console.log("decode that shit")
    //                     console.log(decode)
                        // User.findOne({
                        //     _id:mongoose.Types.ObjectId(req.headers.refreshtoken.userid)
                        // })
                        // console.log(decode.user._id)
                        // User.findById(decode.user._id).exec().then((user)=>{
                        //     if(user){ 
                        //         User.findByIdAndUpdate(decode.user._id, {status:"verified"}, (err,updateduser)=>{
                        //             if(err){
                        //                 console.log(err)
                        //             }else{
                        //                 console.log(updateduser);
                        //             }

                        //         })
                        //         console.log(user)
                        //         console.log("Access token expired, let create a new token for you in verify mail")
                        //         const newaccesstoken=jwt.sign({exp:Math.floor(Date.now()/1000)+ (60*2), user:user}, process.env.SECRET)  
                        //         return res.status(201).send({message:"new access token created for your", accesstoken:newaccesstoken })
                        //     }
                        //     else{
                        //         console.log(user)
                        //         console.log("show this shit here man")
                        //         return res.status(404).send({message:"user not found invalid refresht token" })
                        //     }
                        // }).catch((err)=>{console.log("Didn't find the the stupid user"); return res.status(404).send({message:"Ohh shit"}) }) 
                    
                    

                    
        //             }
        //         })
        //     }else{
        //         console.error(err);
        //         throw new Error(err);
        //     }
        // }else{
        //     console.log(decoded)
        //     console.log("User Email Verification Succcessfully completed, Valid Email")
        //     // User.findById(decoded.user._id).exec().then((user)=>{
            //     if(user){ 
            //         User.findByIdAndUpdate(decoded.user._id, {status:"verified"}, (err,updateduser)=>{
            //             if(err){
            //                 console.log(err)
            //             }else{
            //                 console.log(updateduser);
            //             }
            //         })
            //         const newaccesstoken=jwt.sign({exp:Math.floor(Date.now()/1000)+ (60*2), user:user}, process.env.SECRET)  
            //         console.log("confiremed Email address ")
            //         console.log(user);
            //         return res.status(201).send({message:"new access token created for your", accesstoken:newaccesstoken })
            //     }
            //     else{
            //         console.log(user)
            //         console.log("show this shit here man")
            //         return res.status(404).send({message:"user not found invalid refresht token" })
            //     }
            // }); 
        
        
        
        
//         } 
//     });
// }