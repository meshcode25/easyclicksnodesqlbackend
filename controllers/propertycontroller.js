import mysql from "mysql";
import dbConnection from "../databaseSchemas/connectDatabase";
// var uniqueId = require("../databaseSchemas/uniqueId")
import { v4 as uuidv4 } from 'uuid';
import { verify } from "jsonwebtoken";
import cookieParser from "cookie-parser";

// console.log(dbconn);;



export function createProperty(req,res,next){
    console.log("here is the req.body   below aaa a    ");
    console.log(req.body);

    var dbconn=dbConnection()
    const uniqueId=uuidv4()

    // console.log(dbconn);
    // console.log(req.headers.authorization);

    // console.log(authHeader);

    async function getHeaders(){
        try{
            const authHeader=req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.split(' ')[1];
                req.token = token.accesstoken; // Attach the token to the request object
                req.user_id=token.user_id;
                
                console.log(token);

                const decodedToken=verify(token, process.env.ACCESS_TOKEN_SECRET);
        
                console.log("here is the dECODED token ")
                console.log(decodedToken);


                return decodedToken;
            } else {
                req.token = null;
        
                console.log("There is no accesstoken the token ")
                console.log(token);
            }
        
        }
        catch(err){
            console.log(err);
        }
    }  
    
    // const accesstoken=jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET)
    
    const userId=getHeaders().then((err,results)=>{
        if(err){
            console.log(err);

        }
        else{
            console.log("here is the decoded Response from first async function ")
            console.log(results);
        }
    }) 
    
    


    const propertyData={property_id:uniqueId, property_name:req.body.propertyname, total_units:req.body.totalunits,available_units:req.body.availableunits}

    dbconn.query(`INSERT INTO properties SET ? `, propertyData, (err,results,fields)=>{
        if(err){
            console.log(err);
            // throw err
            if(err.code=='ER_DUP_ENTRY'){
            
                console.log("Err, DUP_ENTRY " + err);
                
                const propertyId=uuidv4();

                const propertyData={property_id:propertyId,property_name:req.body.propertyname,total_units:req.body.totalunits,available_units:req.body.availableunits}


                dbconn.query(`INSERT INTO properties SET ?`, propertyData, (err,results, fields)=>{
                    if(err){
                        console.log(err)
                        throw err;
                        
                    }
                    else{
                        console.log(results);
                        console.log("New Property Created on second Err_Duplitcate trial")
                        
                        return res.status(201).send({message:`New Property Created, from after ERR_Dup_Entry`, propertyid:propertyData.property_id})
                        // return res.status(201).send({message:`Account Created Successfully,check your Email to Verify your Account`, refreshtoken:refreshToken, accesstoken:accessToken})
                    }
                })
            }
            else{
                throw err
            }
        }
        else{
            console.log(results);
            console.log("New Property Created on First trial")
            console.log(propertyData.property_id);
            return res.status(201).send({message:`New Property Created, from after First Generation of UUID`, propertyid:propertyData.property_id})
            // return res.status(
        }
    })

}





export function createLandlord(req,res,next){
    console.log(req.body);
    console.log(req.body.landlordphonenumber);

    const property_id=req.params.propertyid;
    console.log("Here is the property Id " + property_id)

    const dbconn=dbConnection()
    const uniqueId=uuidv4()

    const userData={user_id:uniqueId, first_name:req.body.landlordname, email:req.body.landlordemail, role:JSON.stringify({roles:["LANDLORD"]}), status:"pending", phonenumber:req.body.landlordphonenumber}
        
    const checkuser =`SELECT * FROM users WHERE email="${req.body.landlordemail}";`;

    const checkProperty=`SELECT * FROM properties WHERE property_id="${property_id}";`;
    

    console.log(req.body.landlordphonenumber);

    dbconn.query(checkuser, function(err, results){
        if(err){
            console.log(err);
        }
        else{
            console.log(results[0]);
            if(results.length <1){
                dbconn.query(`INSERT INTO users SET ?`, userData, (err,results, fields)=>{
                    const uniqueID=uuidv4();

                    const landlord_id=uuidv4();

                    const userData2={user_id:uniqueID, first_name:req.body.landlordname, email:req.body.landlordemail, role:JSON.stringify({roles:["LANDLORD"]}), status:"pending", phonenumber:req.body.landlordphonenumber}
                    const landlordData={landlord_id:landlord_id, user_id:userData2.user_id,  first_name:userData2.landlordname, email:userData2.email, phonenumber:userData2.phonenumber} 
                    const propertyData={landlord_id:landlord_id,user_id:uniqueID};

                    if(err){

                        if(err.code=='ER_DUP_ENTRY'){

                            dbconn.query(`INSERT INTO users SET ?`, userData2, (err,results, fields)=>{
                                if(err){
                                    console.log(err)
                                    
                                }
                                else{
                                    
                                    dbconn.query(`INSERT INTO landlords SET ? `, landlordData, (err,results)=>{
                                        if(err){
                                            console.log(err)
                                        }
                                        else{
                                            console.log("New Landlord Successfully created Results below ")
                                            console.log(results);
                                    
                                            dbconn.query(checkProperty, (err,results)=>{
                                                if(err){
                                                    console.log(err)
                                                }
                                                else{
                                                    if(results.length>0){
                                                        dbconn.query(`UPDATE properties SET ? WHERE property_id="${property_id}";`, propertyData, (err,results)=>{
                                                            if(err){
                                                                console.log("error inserting into properties table");
                                                                console.log(err)
                                                            }
                                                            else{
                                                                console.log("properties table sucessfully updated");
                                                                console.log(results)            
                                                            }
                                                        })
                                                    }
                                                    else{
                                                        console.log("No such propeperty Registered yet!")
        
                                                    }
        
                                                }
                                            })

                                            return res.status(201).send({message:`New Landlord Created Successfully, Check Email to Verify Account`})


                                          
                                        }
                                    })

                
            
                                }
                            })
                        }
                        else{
                            console.log(err)

                        }
                    }
                    else{

                        // var landlord_id=uuidv4();
                        const landlordData2={landlord_id:landlord_id, user_id:userData.user_id,  first_name:userData.first_name, email:userData.email, phonenumber:userData.phonenumber} 
                        // const uniqueID=uuidv4();
                        const propertyData2={landlord_id:landlord_id,user_id:uniqueId};



                        dbconn.query(`INSERT INTO landlords SET ? `, landlordData2, (err,results)=>{
                            if(err){
                                console.log(err)
                            }
                            else{
                                console.log("New Landlord Successfully created Results below ")
                                console.log(results);
                                
                                dbconn.query(`UPDATE properties SET ? WHERE property_id="${property_id}";`, propertyData2, (err,results)=>{
                                    if(err){
                                        console.log("error inserting into properties table");
                                        console.log(err)
                                    }
                                    else{
                                        console.log("properties table sucessfully updated");
                                        console.log(results)            
                                    }
                                })

                                return res.status(201).send({message:`New Landlord Created Successfully, Check Email to Verify Account`})


                           
                            }
                        })    

                    }
                })
            }
            else{
                var role=JSON.parse(results[0].role);
                console.log("here isthe role object" + role);
                console.log(role );

                const containsrole=role.roles.includes("LANDLORD");
                var current_roles=role.roles;


                console.log("just set the update user " + current_roles)
                console.log("here is the !containsroles " + containsrole)
            
                
                var landlord_id=uuidv4();
                var landlordData={landlord_id:landlord_id, user_id:results[0].user_id, first_name:userData.first_name, email:userData.email, phonenumber:userData.phonenumber} 
                var propertyData={landlord_id:landlord_id,user_id:results[0].user_id};

                if(!containsrole){
                    var update_roles= current_roles.push("LANDLORD");
                    console.log("updated roles list   "   + update_roles)
                    console.log(update_roles);
                    const update_user={role:JSON.stringify({roles:update_roles})}
                    console.log("updated roles list   "   + update_user);
                    console.log(update_user)


                        
                    dbconn.query(`UPDATE users SET ? WHERE user_id="${results[0].user_id}";`, update_user, (err,result)=>{
                        if(err){
                            console.log("error updating the user's roles into users table");
                            console.log(err)
                        }
                        else{
                            console.log("User's role successfully updating the user's roles into users table");
                            console.log(result)
                            console.log(result);

                            console.log("here are the user details from already exists user landlord");
                            console.log(results);
                            console.log(results);
            
                            // console.log(userDaa.phonenumber)
            
                            dbconn.query(`INSERT INTO landlords SET ? `, landlordData, (err,results)=>{
                                if(err){
                                    console.log(err)
                                }
                                else{
                                    console.log("New Landlord Successfully created Results below ")
                                    console.log(results);
                                    
            
                                    dbconn.query(`UPDATE properties SET ? WHERE property_id="${property_id}";`, propertyData, (err,results)=>{
                                        if(err){
                                            console.log("error inserting into properties table");
                                            console.log(err)
                                        }
                                        else{
                                            console.log("properties table sucessfully updated");
                                            console.log(results)            
                                        }
                                    })
            
                                    return res.status(201).send({message:`New Landlord Created Successfully, Check Email to Verify Account`})
            
            
                                }
                            })            
                        }
                    })

                }
                else{
                    dbconn.query(`INSERT INTO landlords SET ? `, landlordData, (err,results)=>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            console.log("New Landlord Successfully created Results below ")
                            console.log(results);
                            
    
                            dbconn.query(`UPDATE properties SET ? WHERE property_id="${property_id}";`, propertyData, (err,results)=>{
                                if(err){
                                    console.log("error inserting into properties table");
                                    console.log(err)
                                }
                                else{
                                    console.log("properties table sucessfully updated");
                                    console.log(results)            
                                }
                            })
    
                            return res.status(201).send({message:`New Landlord Created Successfully, Check Email to Verify Account`})
    
                        }
                    })            
                }  

            }
        }
    })    


}


export async function createCaretaker(req,res,next){
    const caretakerdetails=req.body;
    const property_id=req.params.propertyid;
    const dbconn=dbConnection()
    const uniqueId=uuidv4()
    const userData={user_id:uniqueId, first_name:req.body.caretakername, email:req.body.caretakeremail, role:"caretaker", status:"pending", phonenumber:req.body.caretakerphonenumber}
    const checkuser =`SELECT * FROM users WHERE email="${req.body.caretakerdemail}";`;
    const checkProperty=`SELECT * FROM properties WHERE property_id="${property_id}";`;
    
    console.log(caretakerdetails);
    console.log("Here is the property Id for createCaretaker" + property_id);


    const  caretaker_id=uuidv4();
    
    const caretakerData={caretaker_id:caretaker_id, user_id:uniqueId, first_name:req.body.caretakername, email:req.body.caretakeremail, phonenumber:req.body.caretakerphonenumber}
    const propertyData={caretaker_id:caretaker_id};
    


    try{ 
        dbconn.query(checkuser, function(err, results){
            if(err){
                console.log(err);
                throw err;
            }
            else{
                if(results.length <1){
                    dbconn.query(`INSERT INTO users SET ?`, userData, (err,results, fields)=>{
                        if(err){
                            console.log(err);
                            throw err;
                        }
                        else{
                        
                            dbconn.query(`INSERT INTO caretakers SET ? `, caretakerData, (err,results)=>{
                                if(err){
                                    console.log(err)
                                }
                                else{
                                    console.log("New Caretaker Successfully created Results below ")
                                    console.log(results);
                            
                                    dbconn.query(checkProperty, (err,results)=>{
                                        if(err){
                                            console.log(err)
                                        }
                                        else{
                                            if(results.length>0){
                                                dbconn.query(`UPDATE properties SET ? WHERE property_id="${property_id}";`, propertyData, (err,results)=>{
                                                    if(err){
                                                        console.log("error inserting into properties table");
                                                        console.log(err)
                                                    }
                                                    else{
                                                        console.log("properties table sucessfully updated");
                                                        console.log(results)            
                                                    }
                                                })
                                            }
                                            else{
                                                console.log("No such propeperty Registered yet!")

                                            }

                                        }
                                    })

                                    return res.status(201).send({message:`New Caretaker Created Successfully, Caretaker to Check Email to Verify Account`})         
                                }
                            })
                        }
                    })
                }else{
                    const user_id=results[0];              
                    const caretakerData2={caretaker_id:caretaker_id, user_id:user_id, first_name:req.body.caretakername, email:req.body.caretakeremail, phonenumber:req.body.caretakerphonenumber}
                   

                    dbconn.query(`INSERT INTO caretakers SET ? `, caretakerData2, (err,results)=>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            console.log("New Caretaker Successfully created Results below ")
                            console.log(results);
                    
                            dbconn.query(checkProperty, (err,results)=>{
                                if(err){
                                    console.log(err)
                                }
                                else{
                                    if(results.length>0){
                                        dbconn.query(`UPDATE properties SET ? WHERE property_id="${property_id}";`, propertyData, (err,results)=>{
                                            if(err){
                                                console.log("error inserting into properties table");
                                                console.log(err)
                                            }
                                            else{
                                                console.log("properties table sucessfully updated with new caretaker");
                                                console.log(results)            
                                            }
                                        })
                                    }
                                    else{
                                        console.log("No such propeperty Registered yet!")

                                    }

                                }
                            })

                            return res.status(201).send({message:`New Caretaker Created Successfully, Caretaker to Check Email to Verify Account`})         
                        }
                    })
                }
            }
        })
    }
    catch(err){
        console.log(err);
    }
}
