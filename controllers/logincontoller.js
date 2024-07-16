// env.config()
const jwt= require("jsonwebtoken")
const mysql=require("mysql")
const dbConnection=require("../databaseSchemas/connectDatabase")
var uniqueId = require("../databaseSchemas/uniqueId")
const { v4: uuidv4 } = require('uuid');

const bcrypt = require("bcryptjs")

// const e = require("express")
// const secret=authconfig.secret
// const authconfig= require("../authConfig")

exports.login_form_post=function(req,res,next){

   //console.log(req)
    // console.log(req.body.email);
    var dbconn=dbConnection()
    // console.log(dbconn);
 
    


    var checkuser =`SELECT * FROM users WHERE email="${req.body.email}";`;
    
    dbconn.query(checkuser, function(err, results){
        if(err){
            console.log(err);
        }
        else{
            console.log(results);
            if(results.length >0){
                // dbconn.query(`INSERT INTO users SET ?`, userData, (err,results, fields)=>{
                const user=results[0];


                console.log("user index 0 listed below  ")
                console.log(user);
                console.log(user.email)
                console.log(user.password);
                console.log(user.status);
    
                const validatePassword=async(password,hashedpassword)=>{    
                    try{
                        const validPassword= await bcrypt.compare(password,hashedpassword)
                            if (validPassword) {
                                console.log("Valid Password here ");
                            } else {
                                console.log("Invalid Password");
                            }
                        return validPassword;
                    }
                    catch(err){
                        console.log(err);
                        return false;
                        throw err;
                    }
                    
                }

                validatePassword(req.body.password,user.password).then((validPassword)=>{
                    // validatePassword(req.body.password,user.password);
                    console.log("Password match status:" +  validPassword);
                    // return isValid;
                    if(err){
                        throw err;
                    }
                    else{
                        console.log("here is the most important validPassword message" + validPassword);
                       
                        if(validPassword===true){
                            console.log("validPassword == " + validPassword)



                            const isVerifiedEmail=()=>{
                                if(user.status==="pending"){
                                    return false
                                }
                                else{
                                    return true
                                }
                                
                            }
                            
                            const verified=isVerifiedEmail()
                    
                        
                            // if(!verified){
                            //     return res.status(200).send({message: "Unverified Email, Please Check you Email to Verify your Account", color: "red", type:"unverified"})
                            
                            // }else{    
                            
                                const refreshTokenSign=jwt.sign({exp:Math.floor(Date.now()/1000 + (6*30*24*60*60)),user_id:user.user_id, user:user }, process.env.REFRESH_TOKEN_SECRET)   
                                const accessTokenSign=jwt.sign({exp:Math.floor(Date.now()/1000+ (1*60)), user_id:user.user_id, user:user}, process.env.ACCESS_TOKEN_SECRET)  

                                console.log(process.env.REFRESH_TOKEN_SECRET);


                                const checkaccesstokens=`SELECT * FROM accesstokens WHERE user_id="${user.user_id}";`
                                const checkrefreshtokens=`SELECT * FROM refreshtokens WHERE user_id="${user.user_id}";`

                                const accesstokenid=uuidv4();
                                const refreshtokenid=uuidv4();
   
                                console.log("Herer is he refresh token ID " + accesstokenid);
                                console.log("Herer is he refresh token ID  " + refreshtokenid)
                                
                                const accessToken={ accesstoken:accessTokenSign};
                                const refreshToken={refreshtoken:refreshTokenSign};

                                // console.log(refreshTokenSign)
                                // console.log(accessTokenSign)

                                dbconn.query(checkaccesstokens, (err,results,fields)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        if(results.length>0){
                                            dbconn.query(`DELETE FROM accesstokens WHERE user_id="${user.user_id}"`, (err,results,fields)=>{
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
                                            dbconn.query(`DELETE FROM refreshtokens WHERE user_id="${user.user_id}"`, (err,results,fields)=>{                                      
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
                                    type:"successlogin",
                                    message:"Login Success, wait as we redirect you to the next page",
                                    refreshtoken:refreshTokenSign,
                                    accesstoken: accessTokenSign, 
                                    user:user,
                                    color:"green"
                                })
                               
                            
                        }
                        else{
                            console.log("InvalidPassword == " + validPassword)

                            return res.status(200).send({message: "Invalid Password or Email", color: "red", type:"invaliduser"})


                        }
                    }
                });
            }
            else{
                console.log("User Not Registered, Please Sign Up!")
                res.status(200).send({message:"User Not Registerd, please Sign Up! ",color: "red", type:"invalid" })
            }
        }
    })





    




    // .catch(err => console.error(`An error occured while looking at the database for login${err}`))






















































}