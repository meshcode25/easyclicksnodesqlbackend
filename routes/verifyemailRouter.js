const express=require("express");
const router=express.Router();
const verifyemailController=require("../controllers/verifyemailController")



router.get("/:verificationcode", verifyemailController.verifyEmail)

module.exports= router