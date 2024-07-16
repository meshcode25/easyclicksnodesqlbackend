
require("dotenv").config;
const mysql=require("mysql")
const dbConnection=require("../databaseSchemas/connectDatabase")
// var uniqueId = require("../databaseSchemas/uniqueId")
const { v4: uuidv4 } = require('uuid');
const jwt=require("jsonwebtoken");


module.exports = (req, res, next) =>{

    async function getHeaders(){
        try{
            const authHeader=req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.split(' ')[1];
                req.token = token.accesstoken; // Attach the token to the request object
                // req.user_id=token.user_id;
                
                console.log(token);

                const decodedToken=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                
                if(decodedToken){
                    console.log("Valid Token");
                    next();
                }
                
   
            } else {
                req.token = null;
        
                console.log("There is no accesstoken the token ")
                console.log(token);

                return res.status(401).send({message:"access Token Expired"})

            }
        
        }
        catch(err){
              
            if(jwt.TokenExpiredError || jwt.JsonWebTokenError){
                 console.log("Access Token Expired on jwt.verify() for authoenfication middleware")
                return res.status(401).send({message:"access Token Expired"})
            }                
            else{
                console.log("Different unexpected Error encountered")
                console.log(err);
                return res.status(401).send({message:"access Token Expired"})
            }
            
        }
    } 


    getHeaders();


}