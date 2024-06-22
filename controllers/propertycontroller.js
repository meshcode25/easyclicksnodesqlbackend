var apartement= require("../models/apartement")
var apartementaddress= require("../models/apartementaddress")
var apartementimages= require("../models/apartementimages")
var caretaker= require("../models/caretaker")
var landlord= require("../models/landlord")
var unit= require("../models/unit")
var unitsimages= require("../models/unitsimages")


//display list of all apartements at the property mangers dashboard
exports.all_apartements=function(req,res,next){

    apartement.find({}).exec(function(err,results){
        if(err) {
            return next(err)
        }
        else{
            console.log(`List of all available apartement ${results}`)
        }

    })



}