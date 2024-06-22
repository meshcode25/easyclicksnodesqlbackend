const mongoose= require("mongoose");
const async= require("async")


const Schema= mongoose.Schema

const roleSchema= new Schema({
    role:{type:Array, required:false },
    
})

module.exports=mongoose.model("role", roleSchema)