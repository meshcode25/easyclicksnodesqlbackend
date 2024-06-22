var mongoose = require ("mongoose") ;
var moment= require("moment")
var async= require("async")


var Schema= mongoose.Schema;

var TenantSchema= new Schema({
    companyname: {type:String, required: false},
    email: {type:String, required: false},
    password:{type:String, required:false},
    role:{type:String, required:false},
    verificationcode:{type:String, required:false},
    status:{type:String, required:false}
})


UserSchema.virtual("url").get(function(){
    return "users"
})


module.exports = mongoose.model("Tenant",TenantSchema)