const express=require("express")
const router= express.Router()

const userController= require("../controllers/usersController");
const signupController= require("../controllers/signupcontroller")

//Here are the APIsfor varies sign up routes
//display the sign up form on route /get and /post
//router.get("/", signupController.signup_form_get);

//Handle the entered data for sign up after post request
router.post("/", signupController.signup_form_post);





module.exports=router