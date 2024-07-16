const express=require("express");
const router=express.Router();
const {v4: uuidv4}=require("uuid");
const jwt=require("jsonwebtoken");

const bcrypt=require("bcryptjs");


const dbconnection=require("../databaseSchemas/connectDatabase")



const dbconn=dbconnection();


exports.tokensControllerGet=(req,res,next)=>{

}



// const refreshTokenSign=jwt.sign({exp:Math.floor(Date.now()/1000 + (6*30*24*60*60)),user_id:req.params.verificationcode }, process.env.REFRESH_TOKEN_SECRET)   


exports.tokensControllerPost=(req,res,next)=>{

    console.log("here isthe beginning of the refresh to ken refreshing of access tokens")
   
    console.log(req.body.refreshToken)
    
    
    

    
    
    async function getTokens(){
        try{
            const refreshTokens=req.body.refreshToken;
            
            if(refreshTokens){ 

                const decodedToken=jwt.verify(refreshTokens, process.env.REFRESH_TOKEN_SECRET);
                
                if(decodedToken){
                    console.log("Valid Token");
                    
                    const user_id=decodedToken.user_id;
                    console.log(decodedToken)
                    console.log(user_id);
                    
                    dbconn.query(`SELECT * FROM users WHERE user_id="${user_id}"`,(err,results)=>{
                        if(err){
                            console.log("here is the error from checking users from refresh token" )
                            console.log(err)
                        }
                        else{
                            const user=results[0];
                            console.log(results)
                            console.log(results[0]);
                    


                            console.log(user);

                            const refreshTokenSign=jwt.sign({exp:Math.floor(Date.now()/1000 + (6*30*24*60*60)),user_id:user_id, user:user }, process.env.REFRESH_TOKEN_SECRET)   
                            const accessTokenSign=jwt.sign({exp:Math.floor(Date.now()/1000+ (1*60)), user_id:user_id, user:user}, process.env.ACCESS_TOKEN_SECRET)  


                            const checkaccesstokens=`SELECT * FROM accesstokens WHERE user_id="${user_id}";`
                            const checkrefreshtokens=`SELECT * FROM refreshtokens WHERE user_id="${user_id}";`

                            const accesstokenid=uuidv4();
                            const refreshtokenid=uuidv4();

                            
                            const accessToken={ accesstoken:accessTokenSign};
                            const refreshToken={refreshtoken:refreshTokenSign};


                            dbconn.query(checkaccesstokens, (err,results,fields)=>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    if(results.length>0){
                                        dbconn.query(`DELETE FROM accesstokens WHERE user_id="${user_id}"`, (err,results,fields)=>{
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                console.log("deleted access tokens")
                                                console.log(results);

                                                dbconn.query(`INSERT INTO accesstokens SET ? `, accessToken, (err,results,fields)=>{
                                                    if(err){
                                                        console.log(err);
                                                    }
                                                    else{
                                                        console.log("new access token created inserted ")
                                                        console.log(results)
                                                    }
                                                })
                                            }
                                        })

                                    }
                                    else{

                                        dbconn.query(`INSERT INTO accesstokens SET ? ;`, accessToken, (err,results,fields)=>{
                                            if(err){
                                                console.log(err);
                                            }
                                            else{
                                                console.log("new access token created inserted ")
                                                console.log(results)
                                            }
                                        })
                                    }
                                }
                            })

                            dbconn.query(checkrefreshtokens, (err,results,fields)=>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    if(results.length>0){
                                        dbconn.query(`DELETE FROM refreshtokens WHERE user_id="${user_id}"`, (err,results,fields)=>{                                      
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                console.log("deleted refresh tokens")
                                                console.log(results);

                                                dbconn.query(`INSERT INTO refreshtokens SET ?`, refreshToken, (err,results,fields)=>{
                                                    if(err){
                                                        console.log(err);
                                                    }
                                                    else{
                                                        console.log("new refresh token created inserted into table refresh tokens")
                                                        console.log(results)

                                                    }
                                                })  
                                            }
                                        })

                                    }
                                    else{
                                        
                                        console.log(results)
                                        dbconn.query(`INSERT INTO refreshtokens SET ? ;`, refreshToken, (err,results,fields)=>{
                                            if(err){
                                                console.log(err);
                                            }
                                            else{
                                                console.log("new refresh token created inserted into table refresh tokens")
                                                console.log(results)

                                            }
                                        })                    

                                    }
                        
                                }
                            })


                            return res.status(201).send({
                                // email:user.email,
                                // accesstoken:token, 
                                type:"successfully Generated Tokens",
                                message:"Tokens Generated Successfully, Keep Logged In",
                                refreshToken:refreshTokenSign,
                                accessToken: accessTokenSign, 
                                user:user,
                                color:"green"
                            })
                        }
                    })

                    
                }
            } 
            else {
                // req.token = null;
        
                console.log("There is no accesstoken the token ")
                console.log(token);
                return res.code(401).send({message:"Refresh Token Err No Token Provided" })

                // return res.status(401).send({message:"access Token Expired"})

            }
        
        }
        catch(err){

            if(jwt.JsonWebTokenError){
                console.log("Refresh Token Expired   on authoenfication middleware")
                console.log(err);
                return res.code(401).send({message:"Refresh Token Expired   on authoenfication middleware"})
                
            }
            else if(jwt.TokenExpiredError ){
                console.log("Refresh Token JsonWebTokenError for authoenfication middleware")
                console.log(err);
                return  res.code(401).send({message:"Refresh Token JsonWebTokenError for authoenfication middleware"})
               
                
            }             
            else{
                console.log("Different unexpected Error encountered")
                return res.code(401).send({message:"Refresh Token JsonWebTokenError for authoenfication middleware"})

            }
            
        }
    } 


    getTokens();

    


}
