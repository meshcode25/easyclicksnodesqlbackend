const mysql=require("mysql")
const dbConnection=require("../databaseSchemas/connectDatabase")
// var uniqueId = require("../databaseSchemas/uniqueId")
const { v4: uuidv4 } = require('uuid');


// console.log(dbconn);;


exports.createLandlord=function(req,res,next){
    console.log(req.body);

}


exports.createProperty= function(req,res,next){
    // console.log(req.body);

    var dbconn=dbConnection()
    const uniqueId=uuidv4()

    // console.log(uniqueId);

    const propertyData={property_id:uniqueId,property_name:req.body.propertyname,total_units:req.body.totalunits,available_units:req.body.availableunits}

    dbconn.query(`INSERT INTO properties SET ? `, propertyData, (err,results,fields)=>{
        if(err){
            if(err.code=='ER_DUP_ENTRY'){
                console.log("Err, DUP_ENTRY " + err);
                
                const propertyId=uuidv4();

                const propertyData={property_id:propertyId,property_name:req.body.propertyname,total_units:req.body.totalunits,available_units:req.body.availableunits}


                dbconn.query(`INSERT INTO properties SET ?`, propertyData, (err,results, fields)=>{
                    if(err){
                        console.log(err)
                        
                    }
                    else{
                        // console.log(results);
                        console.log("New Property Created on second Err_Duplitcate trial")
                        
                        return res.status(201).send({message:`New Property Created, from after ERR_Dup_Entry`, propertyid:results.property_id})
                        // return res.status(201).send({message:`Account Created Successfully,check your Email to Verify your Account`, refreshtoken:refreshToken, accesstoken:accessToken})
                    }
                })
            }
        }
        else{
            // console.log(results);
            console.log("New Property Created on First trial")
            return res.status(201).send({message:`New Property Created, from after First Generation of UUID`, propertyid:results.property_id})
            // return res.status(
        }
    })

}

