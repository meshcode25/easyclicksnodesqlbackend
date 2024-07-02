require("dotenv").config()

const nodemailer=require("nodemailer");
const crypto=require("crypto");
const {google}=require("googleapis");
const OAuth3=google.auth.OAuth2;

const axios = require('axios');

// console.log("Here is google apis    " + OAuth3);

const callbackTokens=require("./oauthcallback");





const createTransporter =  (emailcontact, token2verifyemail) => {

  const Easyclicksclient = new OAuth3(
    process.env.CLIENT_ID,
    process.env.CLIENT_KEY,
    "http://localhost:8000/oauthcallback"
    // "https://developers.google.com/oauthplayground"
  );

    Easyclicksclient.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });



  // Access scopes for read-only Drive activity.
  const scopes = [
    'https://www.googleapis.com/auth/gmail.send'
  ];

  // Generate a secure random state value.
  const state = crypto.randomBytes(32).toString('hex');

  // Store state in the session
  // req.session.state = state;

  // Generate a url that asks permissions for the Drive activity scope
  const authorizationUrl= Easyclicksclient.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',


    //prompt 
    prompt:'consent',
    /** Pass in the scopes array defined above.
      * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true,
    // Include the state parameter to reduce the risk of CSRF attacks.
    state: state
  });

  console.log(authorizationUrl)


  // Easyclicksclient.on('tokens', (tokens) => {
  //   console.log("HERE ARE ALL THE TOKENS  " + tokens);
  //   if (tokens.refresh_token) {
  //       // store the refresh_token in your secure persistent database
  //       console.log(tokens.refresh_token);
        
  //       console.log("here is the refresh_tokens  " + tokens.refresh_token)
  //   }
  //   console.log("here is the access_tokens  " + tokens.access_token)
  //   console.log(tokens.access_token);
    
    
  //   // console.log(emailTransporter())
    
  //   return tokens;            
  // });
  
  
  

  // async function fetchTokens(){
  //   try{
  //     // Assuming 'getAccessTokens' is the correct method
  //     Easyclicksclient.getAccessTokens()
  //       .then(tokens => {
  //         console.log('Access tokens:', tokens);
  //         return tokens;
  //         // Proceed with further actions
  //       })
  //       .catch(err => {
  //         console.error('Error fetching tokens:', err);
  //         // Handle error appropriately
  //     });
  //   } 
  //   catch(err){
  //     console.log("error from catch fetch tokens error " + err.message)
  //   }   
  // }
  
  // const access_token=fetchTokens();


  // global.storedfetchedtokens=tokens;

  // console.log(callbackTokens);
  


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.OWNER,
      accessToken:process.env.ACCESS_TOKEN,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_KEY,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });

  const usermail=emailcontact;
  const username=usermail.substring(0,usermail.lastIndexOf("@"));


  transporter.sendMail({
      subject: "Please Verify Your Account",
      html: `
        <div>
          <p style="font-size:1.4rem" >Hello ${username},</p>

          <p>Thank you for subscribing... </p>
          
          <p>
            Please confirm your email by clicking on the following link
          </p>
        <a color="blue" href=http://localhost:3000/confirm/${token2verifyemail}> Click here</a>
        <p>
          Or if your prefer Please copy and paste or click on this link to your browser to verify your Email, Thanks for subscribing!! 
        </p>
        <p>
        <a color="blue" href=http://localhost:3000/confirm/${token2verifyemail}> http://localhost:3000/confirm/${token2verifyemail}</a>
          </p>
        <p>
          Tschuss!!
          </p>
        </div>
          `,
  
          to: emailcontact,
          from: process.env.OWNER
        })
        .catch((err)=>{
          console.log("Error sending the stupid Mail  "+ err.message + "error thrown below");
          throw err;

        })
        

  //       console.log("Email Sending Process ends here" )
  // var emailObject={email:emailcontact, verificationcode:token2verifyemail}
  // return emailObject;
}






  module.exports=createTransporter