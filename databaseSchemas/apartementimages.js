var mongoose= require ("mongoose")
var async = require( "async")
var moment = require("moment")

var Schema= mongoose.Schema


var apartementImagesSchema= new Schema({
        apartement_name:{type:String, required: true},
        front_view: {type:Buffer, required:true},
        right_side:{ type:Buffer, required: true},
        back_view: {type:Buffer, required:true},
        left_side:{type:Buffer, required:true},
        
})



module.exports= mongoose.model("apartementimages", apartementImagesSchema);
    