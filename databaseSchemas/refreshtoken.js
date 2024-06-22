var mongoose = require ("mongoose") ;
var moment= require("moment")
var async= require("async");
const refresh_token_string= require("../verificationCode");


var Schema= mongoose.Schema;

// token_id: {type:String, required: false, max:100}
var RefreshTokenSchema= new Schema({
    userid:{
        type:mongoose.Types.ObjectId,
        ref:"user",
    },
    expires: {type:Date, required:false},
    refreshtoken:{type:String, required:false},

    createdAt: {type:Date, required:false},
    createdByIp: {type:String, required:false},
    replacedBy: {type:String, required:false},
    revokedByIp: {type:String, required:false},
    revokedBy: {type:String, required:false},
})


RefreshTokenSchema.virtual("url").get(function(){
    return "refreshtoken"
})


module.exports = mongoose.model("refreshtoken",RefreshTokenSchema);