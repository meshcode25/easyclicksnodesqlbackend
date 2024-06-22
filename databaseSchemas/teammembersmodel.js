var mongoose = require ("mongoose") ;
var moment= require("moment")
var async= require("async")


var Schema= mongoose.Schema;

var TeammembersSchema= new Schema({
    name:{type:String, required:false},
    email:{type:String, required:false},
    companyname: {type:String, required: false},
 
})


TeammembersSchema.virtual("url").get(function(){
    return "tenants"
})


module.exports = mongoose.model("teammembers", TeammembersSchema)