require("dotenv").config()
// const role=require("../databaseSchemas/rolesModel")
// const User=require("../databaseSchemas/userModel")
const bcrypt= require("bcryptjs")
const verificationCode = require("../verificationCode")
const moment =require("moment")
// const Refreshtoken=require("../databaseSchemas/refreshtoken");
// exports.signup_form_get= function(req,res, next)
//const sendMail = require("../nodemailer")
//const nodemailer= require("../nodemailer")

const jwt=require("jsonwebtoken");
// const secret= require("../authConfig")
const secret=process.env.SECRET
const sendEmail=require("../Oauth2")
// console.log(`Is this the undefinedd?? ${secret}`);
const mysql=require("mysql")
const dbConnection=require("../databaseSchemas/connectDatabase")
var uniqueId = require("../databaseSchemas/uniqueId")



exports.signup_form_post= function(req,res, next){
    //console.log(req)
    // console.log(req.body.email);
    var dbconn=dbConnection()
    // console.log(dbconn);
    const uniqueID=uniqueId();
    const verfificationCODE = verificationCode();


    
    
    
    
    console.log("Here is the famous unique Id" + uniqueID)

    

    const hashpassword=bcrypt.hash(req.body.password, 10)
    
    var userData={user_id:uniqueID, email:req.body.email, role:req.body.role, password:hashpassword, status:"pending"}
    
    var checkuser =`SELECT * FROM users WHERE email="${req.body.email}";`;
    
    dbconn.query(checkuser, function(err, results){
        if(err){
            console.log(err);
        }
        else{
            console.log(results);
            if(results.length <1){
                dbconn.query(`INSERT INTO users SET ?`, userData, (err,results, fields)=>{
                    if(err){
                        if(err.code=='ER_DUP_ENTRY'){
                            uniqueID=uniqueId();
                            dbconn.query(`INSERT INTO users SET ?`, userData, (err,results, fields)=>{
                                if(err){
                                    console.log(err)
                                    
                                }
                                else{
                                    console.log("New User successfully added!")
                                    console.log(results);
                                    console.log(sendEmail, userData.email);
                                    sendEmail(userData.email,userData.user_id);
                                    // res.setHeader('x-access-token', 'Bearer '+ token);
                                    console.log(userData.email, + "and "+ userData.verification_code)
                                    return res.status(201).send({message:`Account Created Successfully,check your Email to Verify your Account`})
                                    // return res.status(201).send({message:`Account Created Successfully,check your Email to Verify your Account`, refreshtoken:refreshToken, accesstoken:accessToken})

            
                                }
                            })
                        }
                        console.log(err)
                    }
                    else{
                        console.log("New User successfully added!")
                        console.log(results);
                        console.log(sendEmail, userData.email);
                        sendEmail(userData.email,userData.user_id);
                        // res.setHeader('x-access-token', 'Bearer '+ token);
                        // console.log(userData.email + "and "+ userData.verification_code)
                        return res.status(201).send({message:`Account Created Successfully,check your Email to Verify your Account`})
                        // return res.status(201).send({message:`Account Created Successfully,check your Email to Verify your Account`, refreshtoken:refreshToken, accesstoken:accessToken})


                    }
                })
            }
            else{
                console.log("User already exists Please login")
                res.status(200).send({message:"User alreadyexists, please login! "})
            }
        }
    })

    // User.findOne({
    //     email:req.body.email
    // }).exec().then(user=>{
    //     if(user){
    //         // console.log(user)
    //        return res.status(200).send({message:"Email Already Registered, Please Login!" })
    //     }  
    //     else{
    

    //     }
    // }).catch(err => console.error(`An error occured while loking at the database for sign up ${err}`))

}         
          
