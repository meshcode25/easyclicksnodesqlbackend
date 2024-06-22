var mongoose= require ("mongoose")
var async = require( "async")
var moment = require("moment")

var Schema= mongoose.Schema


var unitsImagesSchema= new Schema({
        apartement_name:{type:String, required:true},
        livingroom: {type:Buffer, required:true},
        kitchen:{ type:Buffer, required: true},
        bedroom: {type:Buffer, required:true},
        washroom:{type:Buffer, required:true},
        
})



module.exports= mongoose.model("unitsimages", unitsImagesSchema);
    