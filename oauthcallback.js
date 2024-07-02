require("dotenv").config()
const express=require("express");
const router=express.Router()
const url = require('url');


const nodemailer=require("nodemailer");
const {google}=require("googleapis");
const OAuth3=google.auth.OAuth2;
const crypto=require("crypto");

// const emailTransporter=require("./Oauth2");

// console.log("Here is google apis    " + OAuth3);


router.get("/", async (req,res)=>{
    // console.log("here is the oAuth2 response from the Google O auth ")
    // console.log(req)

    const Easyclicksclient = new OAuth3(
        process.env.CLIENT_ID,
        process.env.CLIENT_KEY,
        "http://localhost:8000/oauthcallback"
        // "https://developers.google.com/oauthplayground"
    );
      
   
    // Receive the callback from Google's OAuth 2.0 server.
    
    let q = url.parse(req.url, true).query;

    if (q.error) { // An error response e.g. error=access_denied
        console.log('Error:' + q.error);
    // } else if (q.state !== req.session.state) { //check state value
        console.log('State mismatch. Possible CSRF attack');
        res.end('State mismatch. Possible CSRF attack');
    } 
    else { // Get access and refresh tokens (if access_type is offline)

        let { tokens } =  Easyclicksclient.getToken(q.code).then((err,tokenresponse)=>{
            if(err){
                console.log(err.message)
                // console.log("here it the refresh token from oauth " + tokens.access_tokens);
            }
            else{
                console.log(tokenresponse);
                 console.log("here it the token from oauth " + tokens.access_tokens);
            }
        });
        
        // const {tokens} =  Easyclicksclient.getToken(code)
        // Easyclicksclient.setCredentials(tokens);


        // This will provide an object with the access_token and refresh_token.
        // Save these somewhere safe so they can be used at a later time.
    
        Easyclicksclient.on('tokens', (tokens) => {
            // console.log("HERE ARE ALL THE TOKENS  " + tokens);
          
            if (tokens.refresh_token) {
                // store the refresh_token in your secure persistent database
                // console.log(tokens.refresh_token);
                
                console.log("here is the refresh_tokens  ")
            }
            else{            
                console.log("here is the access_tokens  " )
                // console.log(tokens.access_token);
            }



            console.log("here are the tokens   " + {tokens})
            console.log("her is teh access tokens " + tokens.access_token)
            console.log("her is teh refresh tokens " + tokens.refresh_token)




            // Easyclicksclient.setCredentials(tokens);
           


            return tokens;            
        });




        Easyclicksclient.setCredentials(tokens);
        console.log("here is the long awaited authorization _ code " + q.code);
    }

})

module.exports=router