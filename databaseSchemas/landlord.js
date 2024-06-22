const mongoose=require("mongoose")
const moment=require("moment")
const async= require("async")

var Schema= mongoose.Schema

var landLordSchema= new Schema({
    first_name:{type: String, required:true, max:100},
    last_name: {type:String, required:false},
    phone_number:{type:String, required:true, max:100},
    email_address: {type:String , required:true, max:100},
})
  
landLordSchema.virtual("name").get(function(){
    var name="";
    if(first_name && last_name){
       name= first_name + "," + last_name;
    }
    if(!fist_name && !family_name){
        name=" ";
    }
    return name;
})


module.exports= mongoose.model("landlord", landLordSchema);
