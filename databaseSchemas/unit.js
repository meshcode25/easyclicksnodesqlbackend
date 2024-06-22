const mongoose=require("mongoose")
const moment=require("moment")
const async= require("async")

var Schema= mongoose.Schema

var unitSchema= new Schema({
        apartement_name:{type: String, required:true,},
        tenant_first_name: {type:String, required:true},
        tenant_last_name: {type:String, required:true},
        tenant_phone_number: {type:String, required:true},
        tenant_email: {type:String, required:true},
        unit_pictures:{type:Schema.ObjectId, ref:"unitsimages", required:true}
})


//create virtuals for the models of the database.
unitSchema.virtual("url"). get(function(){
        return "propertymanager/apartement/unit"+ this._id
})


unitSchema.virtual("tenant_name").get(function(){
        var tenant_name="";
        if(first_name && last_name){
           tenant_name= first_name + "," + last_name;
        }
        if(!fist_name && !family_name){
            tenant_name=" ";
        }
        return tenant_name;
    })
    
    
    module.exports= mongoose.model("unit", unitSchema);
    