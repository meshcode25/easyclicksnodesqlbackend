const express= require("express")
var router= express.Router()

router.get("/", (req, res, next)=>{
    res.send("You have hit the home page of our PMS app")
    console.log("res.redirect");
})

module.exports=router;