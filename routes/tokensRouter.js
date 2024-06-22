const express=require("express");
const router=express.Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");


const Tokens=require("../controllers/tokensController")



router.get("/", Tokens.tokensControllerGet);
router.post("/", Tokens.tokensControllerPost)



module.exports=router;