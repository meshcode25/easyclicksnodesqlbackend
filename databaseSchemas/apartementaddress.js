const mongoose=require("mongoose")
const moment=require("moment")
const async= require("async")

var Schema= mongoose.Schema

var apartementAddressSchema= new Schema({
    country: {type:String, required:true, max:100},
    state: {type: String, required: true, max:100},
    city: {type: String, required: true, max:100},
    street:{type:String, required:true, max:100},
    zip_code:{type:String, required: true, max:100},
})


module.exports= mongoose.model("apartementaddress", apartementAddressSchema);
