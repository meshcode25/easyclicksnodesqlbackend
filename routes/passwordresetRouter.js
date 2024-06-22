const express=require("express")
const router= express.Router()


const passwordresetController= require("../controllers/passwordresetController")

//Here are the APIsfor varies sign up routes
//display the sign up form on route /get and /post
//router.get("/", signupController.signup_form_get);

//Handle the entered data for sign up after post request
router.post("/", passwordresetController.passwordreset_form_post);





module.exports=router