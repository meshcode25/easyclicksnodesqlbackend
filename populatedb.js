// function populatedb (){

// const { adsense_v1_4, dfareporting_v3_3 } = require('googleapis');

//         var mysql=require('mysql');

//         var Apartement= require("./models/apartement")
//         var Apartementaddress= require("./models/apartementaddress")
//         var Caretaker= require("./models/caretaker")
//         var Landlord= require("./models/landlord")
//         var Unit= require("./models/unit")
//         var Apartementimages= require("./models/apartementimages")
//         var Unitimages= require("./models/unitsimages")
//         var users=require("./databaseSchemas/userSchema");


//         mysql.con

//     const mongoose= require("mongoose")
//     const async= require("async")

//     db_url="mongodb://localhost:27017/pmsdatabase"

//     mongoose.connect(db_url, {useNewUrlParser:true})

//     var db=mongoose.connection

//     db.on("error", (error) =>{console.error(error)})
//     db.on("open", ()=>{console.log("Populate MongoDB database has begun in local host Mongoose Database")})

//     var apartements=[]
//     var apartementsimages=[]
//     var apartementaddresses=[]
//     var caretakers=[]
//     var units=[]
//     var unitsimages=[]
//     var landlords=[]
    
    
//     /* 
//     */
//     apartements.splice(0, apartements.length)


//     apartementaddresses.splice(0, apartementaddresses.length)


//     apartementsimages.splice(0, apartementsimages.length)


//     units.splice(0, units.length)


//     unitsimages.splice(0, unitsimages.length)


//     landlords.splice(0, landlords.length)


//     caretakers.splice(0, caretakers.length)


//     //Create a new apartements code for async parallel craeating of apartements
//     function createApartement(apartement_first_name, apartement_last_name, landlord, caretaker, apartement_address, units, unitsimages, cb){
        
//         var apartementdetails= {
//             apartement_first_name:apartement_first_name,
//             apartement_last_name:apartement_last_name,
//             landlord:{
//              landlord
//             },
//             caretaker:{
//                 caretaker
//             },
//             apartement_address:{
//                 apartement_address
//             },
//             units: units,
//             unitsimages: unitsimages
//         }

//         var apartement= new Apartement(apartementdetails);
//         apartement.save(function(err){
//             if(err){
//                 cb(err, null)

//             }else{
//                 console.log("New apartement has been created in the populated DB"+ apartement)
//                 apartements.push(apartement)
//                 cb(null, apartement)
             
//              }
//         })

//     }



//     //Create a new Unit code for async parallel craeating of units
//     function createUnit(apartement_name,tenant_first_name, tenant_last_name, tenant_phone_number, tenant_email, unit_pictures, cb){
//         var unitdetails= {
//             apartement_name:apartement_name,
//             tenant_first_name:tenant_first_name,
//             tenant_last_name:tenant_last_name,
//             tenant_phone_number:tenant_phone_number,
//             tenant_email:tenant_email,
//             unit_pictures:unit_pictures,
//         }

//         var unit= new Unit(unitdetails);
     

//         unit.save(function(err){
//             if(err){
//                 cb(err, null)
  
 
//             }else{
//                 console.log("New unit has been created in the populated DB"+ unit)
//                 units.push(unit)
//                 cb(null, unit)
             
//              }
//         })

//     }



//     //Create a new apartements" Images code for async parallel craeating of apartements'Images
//     function createApartementImages(apartement_name,front_view, right_side, back_view, left_side,cb){
//         var apartementImagesDetails={
//             apartement_name:apartement_name,
//             front_view:front_view,
//             right_side:right_side,
//             back_view:back_view,
//             left_side:left_side,
//         }
//         var apartementimages= new Apartementimages(apartementImagesDetails);
//         apartementimages.save(function(err){
//             if(err){
//                 cb(err,null)
//                 return
//             } else{
//                 console.log("New ApartementsImages Added"+ apartementimages)
//                 apartementsimages.push(apartementimages)
//                 cb(null, apartementimages)
//             }
//         })
//     }


//     //Create a new units' images  code for async parallel craeating Units'images
//         function createUnitImages(apartement_name, livingroom, kitchen, bedroom, washroom,cb){
//             var unitImagesDetails={
//                 apartement_name:apartement_name,
//                 livingroom: livingroom,
//                 kitchen:kitchen,
//                 bedroom: bedroom,
//                 washroom: washroom,
//             }
//             var unitimages= new Unitimages(unitImagesDetails);
//             unitimages.save(function(err){
//                 if(err){
//                   //(err,null)
//                   //console.log(err)  
//                   return
//                 } else{
//                     console.log("New UnitImages Added"+ unitimages)
//                     unitsimages.push(unitimages)
//                     cb(null, unitimages)
//                 }
//             })
//         }
        

//     //Create a caretaker  code for async parallel craeating caretaker
//             function createCareTaker(first_name, last_name, phone_number, email_address,cb){
//                 var caretakerdetails={
//                     first_name:first_name,
//                     last_name:last_name,
//                     phone_number:phone_number,
//                     email_address:email_address,
//                 }
//                 var caretaker= new Caretaker(caretakerdetails);
//                 caretaker.save(function(err){
//                     if(err){
//                         cb(err,null)
//                         return
//                     } else{
//                         console.log("New Caretaker Added"+ caretaker)
//                         caretakers.push(caretaker)
//                         cb(null, caretaker)
//                     }
//                 })

//     }



//     //Create a new landlords  code for async parallel craeating landlords
//         function createLandLord(first_name, last_name, phone_number, email_address,cb){
//             var landlorddetails={
//                 first_name:first_name,
//                 last_name:last_name,
//                 phone_number:phone_number,
//                 email_address:email_address,
//             }
//             var landlord= new Landlord(landlorddetails);
//             landlord.save(function(err){
//                 if(err){
//                     cb(err,null)
//                     return
//                 } else{
//                     console.log("New landlord Added"+ landlord)
//                     landlords.push(landlord)
//                     cb(null, landlord)
//                 }
//             })

//         }


//         //Create new addresses  code for async parallel craeating apartement's address
//     function createApartementAddress(country, state, city, street, zip_code,cb){
//             var addressdetails={
            
//                 country:country,
//                 state:state,
//                 city:city,
//                 street:street,
//                 zip_code:zip_code,
//             }
//             var apartementaddress= new Apartementaddress(addressdetails);
//             apartementaddress.save(function(err){
//                 if(err){
//                     cb(err,null)
//                     return
//                 } else{
//                     console.log("New Adress Added"+ apartementaddress)
//                     apartementaddresses.push(apartementaddress)
//                     cb(null, apartementaddress)
//                 }
//             })

//     }


//     //create apartements using async
//     function createApartements(cb){
//         async.parallel([
//             function(callback){
//                 createApartement("blumenheights", "", landlords[0], caretakers[0], apartementaddresses[0], [units[0],units[1]], unitsimages[0], callback)
//             },
//             function(callback){
//                 createApartement("gluckheights", "", landlords[1], caretakers[1], apartementaddresses[1], [units[2],units[3]], unitsimages[1], callback)
//             },
//             function(callback){
//                 createApartement("traurigheights", "", landlords[2], caretakers[2], apartementaddresses[2], [units[4],units[5]], unitsimages[2], callback)
//             },
//             function(callback){
//                 createApartement("erfolgights", "", landlords[3], caretakers[3], apartementaddresses[3], [units[6],units[7]], unitsimages[3], callback)
//             },
//             function(callback){
//                 createApartement("bestimmtheights", "", landlords[4], caretakers[4], apartementaddresses[4], [units[8],units[9]], unitsimages[4], callback)
//             },

//         ],
//         //optional callback
//         cb
//         )
//     }


//     //create units using async
//     function createUnits(cb){
//         async.parallel([
//             function(callback){
//                 createUnit("blumenheights","Karomo", "kellner", "+2690980986", "karomo@gmail.com", unitsimages[0], callback)
//             },
//             function(callback){
//                 createUnit("blumenheights","Eroenng", "Svenictiz", "+3737980986", "eroenng@gmail.com", unitsimages[1], callback)
//             },
//             function(callback){
//                 createUnit("gluckheights","Schuld", "Sebastian", "+9440980986", "shuld@gmail.com", unitsimages[2], callback)
//             },
//             function(callback){
//                 createUnit("guckheights","Ayliva", "Allein", "+4090980986", "aylivagmail.com", unitsimages[3], callback)
//             },
//             function(callback){
//                 createUnit("taurigheights","Allerdein", "Gellogrio", "+58790980986", "allerdein@gmail.com", unitsimages[4], callback)
//             },
//             function(callback){
//                 createUnit("taurigheights","Fuhler", "Kuhl", "+2690980986", "kuhl@gmail.com", unitsimages[5], callback)
//             },
//             function(callback){
//                 createUnit("erflogheights","Lorvenna", "Junli", "+49890980986", "lorvenna@gmail.com", unitsimages[6], callback)
//             },
//             function(callback){
//                 createUnit("erfolgheights","knellner", "Schapper", "+9890980986", "schwarz@gmail.com", unitsimages[7], callback)
//             },//             function(callback){
//                 createUnit("bestimmtheights","Ellergine", "Grundern", "+09790980986", "ellergine@gmail.com", unitsimages[8], callback)
//             },
//             function(callback){
//                 createUnit("bestimmtheights","Pfereder", "schtrock", "+25190980986", "schtrock@gmail.com", unitsimages[9], callback)
//             },


//         ],
//         //optional callback
//         cb
//         )
//     }

//     //create apartements'images using async
//     function createApartementsImages(cb){
//         async.parallel([
//             function(callback){
//                 createApartementImages("blumenheights", "blumeheightsfrontview", "blumenheightsrightview", "blumenheightsbackview", "blumenheightsleftview", callback)
//             },
//             function(callback){
//                 createApartementImages("gluckheights","gluckheightsfrontview", "gluckheightsrightview", "gluckheightsbackview", "gluckheightsleftview", callback)
//             },
//             function(callback){
//                 createApartementImages("traurigheights","traurigheightsfrontview", "traurigheightsrightview", "traurigheightsbackview", "traurigheightsleftview", callback)
//             },
//             function(callback){
//                 createApartementImages("erfolgheights","erfolgheightsfrontview", "erfolgheightsrightview", "erfolgheightsbackview", "erfolgheightsleftview", callback)
//             },
//             function(callback){
//                 createApartementImages("bestimmtheights","bestimmtheightsfrontview", "bestimmtheightsrightview", "bestimmtheightsbackview", "bestimmtleftview", callback)
//             },


//         ],
//         //optional callback
//         cb
//         )
//     }

//     //create Units' Images using async
//     function createUnitsImages(cb){
//         async.parallel([
//             function(callback){
//                 createUnitImages("blumenheights", "unit1livingroom", "unit1kitchen", "unit1bedroom", "unit1washroom",callback)
//             },
//             function(callback){
//                 createUnitImages("blumenheights", "unit2livingroom", "unit2kitchen", "unit2bedroom", "unit2washroom",callback)
//             },
//             function(callback){
//                 createUnitImages("gluckheights", "unit1livingroom", "unit1kitchen", "unit1bedroom", "unit1washroom",callback)
//             },
//             function(callback){
//                 createUnitImages("gluckheights", "unit1livingroom", "unit1kitchen", "unit1bedroom", "unit1washroom", callback)
//             },
//             function(callback){
//                 createUnitImages("traurigheights", "unit1livingroom", "unit1kitchen", "unit1bedroom", "unit1washroom",callback)
//             },
//             function(callback){
//                 createUnitImages("traurigheights", "unit2livingroom", "unit2kitchen", "unit2bedroom", "unit2washroom",callback)
//             },
//             function(callback){
//                 createUnitImages("erfolgheights", "unit1livingroom", "unit1kitchen", "unit1bedroom", "unit1washroom",callback)
//             },
//             function(callback){
//                 createUnitImages("erfolgheights", "unit2livingroom", "unit2kitchen", "unit2bedroom", "unit2washroom",callback)
//             },
//             function(callback){
//                 createUnitImages("bestimmtheights", "unit1livingroom", "unit1kitchen", "unit1bedroom", "unit1washroom",callback)
//             },
//             function(callback){
//                 createUnitImages("bestimmtheights", "unit2livingroom", "unit2kitchen", "unit2bedroom", "unit2washroom",callback)
//             },
    
//         ],
//         //optional callback
//         cb
//         )
//     }


//     //create apartements' Addresses using async
//     function createApartementAddresses(cb){
//         async.parallel([
//             function(callback){
//                 createApartementAddress("deutsch", "muchen", "mundel", "meinliebestrasse", "23323", callback)
//             },
//             function(callback){
//                 createApartementAddress("schweiz", "berne", "fraufeld", "schneiderstrasse", "7432", callback)
//             },
//             function(callback){
//                 createApartementAddress("frankreich", "paris", "germain", "wissensteinstrasse", "90314", callback)
//             },
//             function(callback){
//                 createApartementAddress("leichtenstein", "schaan", "vaduz", "vaduzliebestrasse", "39892", callback)
//             },
//             function(callback){
//                 createApartementAddress("austria", "Wienstaat", "wien", "meinliebestrasse", "59814", callback)
//             }

//         ],
//         //optional callback
//         cb
//         )
//     }

//     //create caretaker using async
//     function createCareTakers(cb){
//         async.parallel([
//             function(callback){
//                 createCareTaker("Joel", "brandenstein", "678903", "joel@gmail.com",callback)
//             },
//             function(callback){
//                 createCareTaker("Namika", "singerin", "+293678903", "namika@gmail.com",callback)
//             },
//             function(callback){
//                 createCareTaker("Meitre", "bGims", "+297378903", "Meitre@gmail.com",callback)
//             },
//             function(callback){
//                 createCareTaker("Frenkrik", "bSchneider", "+349678903", "frankreik@gmail.com",callback)
//             },
//             function(callback){
//                 createCareTaker("Nico", "Neuman", "+4799678903", "Nico@gmail.com",callback)
//             },
//         ],
//         //optional callback
//         cb
//         )
//     }


//     //create landlords using async
//     function createLandLords(cb){
//         async.parallel([
//             function(callback){
//                 createLandLord("Marriane", "Berge", "+4799678903", "marianne@gmail.com",callback)
//             },
//             function(callback){
//                 createLandLord("Lea", "kaufman", "+4499678903", "lea@gmail.com",callback)
//             },
//             function(callback){
//                 createLandLord("Willium", "Frenzish", "+5099678903", "willium@gmail.com",callback)
//             },
//             function(callback){
//                 createLandLord("Steigen", "Nerdman", "+4899678903", "steigen@gmail.com",callback)
//             },
//             function(callback){
//                 createLandLord("Freidrich", "nietsche", "+4199678903", "freidrich@gmail.com",callback)
//             },

//         ],
//         //optional callback
//         cb
//         )
//     }
    
    
//     //Call the parallel asyncronous function in series
//     async.series([

//         createApartementAddresses,
//         createCareTakers,
//         createLandLords,
//         createUnitsImages,
//         createApartementsImages,
//         createUnits,
//         createApartements,
        
                
//     ],
            
//     //optional call back function
//     function(err,result){
//         if(err){
//             console.log("There was"+ err+ "in populating the datebase")
//         }
//         else{
//              console.log("The Local MonogoDB database has successfully been populated");
//     }
        
//     //disconnect from database becasause it has already been poplulated
//     mongoose.connection.close();
            
//         })
    


// }
// module.exports=populatedb;

 
function populatedb (){
    var uniquestring=[1,2,3,4,5,6,7,8,9,0,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    
    var uniqueid=()=>{
        for(let i=0;i<uniquestring.length;i++){
            var randommathvalue=Math.random();
            return randommathvalue;
        }
    }

    console.log(uniqueid())

    var mysql = require('mysql');
  
    // var mysql = require('mysql');
    
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database:'easyClicksDatabase',
    });
    
    con.connect(function(err) {
      if (err) throw err;
    //   console.log(err.message)
     
      async function createSqlTables(){

          try{
            var createuserstable=`CREATE TABLE IF NOT EXISTS users(
                user_id VARCHAR(255) PRIMARY KEY, 
                first_name VARCHAR(255), 
                last_name VARCHAR(255), 
                email VARCHAR(255),
                password VARCHAR(255), 
                phonenumber INT(255), 
                role VARCHAR(255), 
                address VARCHAR(255),
                status VARCHAR(255),
                verification_code VARCHAR(255),   
                access_token VARCHAR(255),
                refresh_token VARCHAR(255)   
            )`

            var createlandlordstable= `CREATE TABLE IF NOT EXISTS landlords(
                landlord_id VARCHAR(255) PRIMARY KEY, 
                first_name VARCHAR(255), 
                last_name VARCHAR(255), 
                email VARCHAR(255), 
                phonenumber INT(255), 
                address VARCHAR(255),
                user_id VARCHAR(255),
                FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
            );`


            var createcaretakerstable=`CREATE TABLE IF NOT EXISTS caretakers(
                caretaker_id VARCHAR(255) PRIMARY KEY, 
                first_name VARCHAR(255), 
                last_name VARCHAR(255), 
                email VARCHAR(255), 
                phonenumber INT(255), 
                address VARCHAR(255),
                user_id VARCHAR(255),
                FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
            )`;
    
            var createagentstable=`CREATE TABLE IF NOT EXISTS agents(
                agent_id VARCHAR(255) PRIMARY KEY, 
                first_name VARCHAR(255), 
                last_name VARCHAR(255), 
                email VARCHAR(255), 
                phonenumber INT(255), 
                address VARCHAR(255),
                user_id VARCHAR(255),
                FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
            )`;
    
    
            var createtanantstable=`CREATE TABLE IF NOT EXISTS tenants(
                tenant_id VARCHAR(255) PRIMARY KEY, 
                first_name VARCHAR(255), 
                last_name VARCHAR(255), 
                email VARCHAR(255), 
                phonenumber INT(255), 
                address VARCHAR(255),
                user_id VARCHAR(255),
                FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
            )`;
            
            var createserviceproviderstable=`CREATE TABLE IF NOT EXISTS serviceproviders(
                service_provider_id VARCHAR(255) PRIMARY KEY,
                service_provided VARCHAR(255), 
                first_name VARCHAR(255), 
                last_name VARCHAR(255), 
                email VARCHAR(255), 
                phonenumber INT(255), 
                address VARCHAR(255),
                user_id VARCHAR(255),
                FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
            )`;
    
            var createapartmentimagestable=`CREATE TABLE IF NOT EXISTS apartmentimages(
                image_id VARCHAR(255) PRIMARY KEY, 
                property_id VARCHAR(255), 
                image_view VARCHAR(255), 
                image_status VARCHAR(255), 
                image_path VARCHAR(255),
                
                FOREIGN KEY(property_id) REFERENCES properties(property_id) ON UPDATE CASCADE ON DELETE CASCADE
            )`;
    
            var createpropertiestable=`CREATE TABLE IF NOT EXISTS properties(
                property_id VARCHAR(255) PRIMARY KEY,
                user_id VARCHAR(255), 
                property_name VARCHAR(255), 
                total_unit_per_apartment INT(255),
                currently_letting_units_per_apartment INT(255),
                property_type VARCHAR(255),
                listing_purpose VARCHAR(255), 
                internal_features_per_unit JSON,
                apartment_features JSON,
                apartment_features_nearby JSON,
                apartment_rooms_per_unit JSON,
                price VARCHAR(255),
                
                landlord_id VARCHAR(255),
                caretaker_id VARCHAR(255),
                service_provider_id VARCHAR(255),
              
                FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
                FOREIGN KEY(landlord_id) REFERENCES landlords(landlord_id) ON UPDATE CASCADE ON DELETE CASCADE,
                FOREIGN KEY(caretaker_id) REFERENCES caretakers(caretaker_id) ON UPDATE CASCADE ON DELETE CASCADE,
                FOREIGN KEY(service_provider_id) REFERENCES serviceproviders(service_provider_id) ON UPDATE CASCADE ON DELETE CASCADE
    
            )`;
            
            var createaccesstokenstable=`CREATE TABLE IF NOT EXISTS accesstokens(
                accesstoken_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id VARCHAR(255),
                accesstoken VARCHAR(1024),
                FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
            )`;
           

            var createrefreshtokenstable=`CREATE TABLE IF NOT EXISTS refreshtokens(
                refreshtoken_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id VARCHAR(255),
                refreshtoken VARCHAR(1024),
                FOREIGN KEY(user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
            )`;


            // await(createuserstable);
            // await(createlandlordstable);
            // console.log("tables created sucessfully")

            con.query(createuserstable, function(error,results){
                if (error){
                    console.log(error);
                    console.log("error right here")
                    console.log(this.sql)
                    // throw err;
                }
                else{
                    console.log("userss table successfully created");
                    console.log(results);   
                }
            });

            
            con.query(createlandlordstable, function(error,results){
                if (error){
                    console.log(error);
                    // throw err;
        
                }
                else{
                    console.log("Landlords table  table successfully created");
                    console.log(results);   
                }
            });


            
            con.query(createcaretakerstable, function(error,results){
                if (error){
                    console.log(error);
                    // throw err;
        
                }
                else{
                    console.log("caretakers table successfully created");
                    console.log(results);   
                }
            });

            con.query(createagentstable, function(error,results){
                if (error){
                    console.log(error);
                    // throw err;

                }
                else{
                    console.log("agents table successfully created");
                    console.log(results);   
                }
            });

            con.query(createtanantstable, function(error,results){
                if (error){
                    console.log(error);
                    // throw err;

                }
                else{
                    console.log("Tenants table successfully created");
                    console.log(results);   
                }
            });
            
            con.query(createserviceproviderstable, function(error,results){
                if (error){
                    console.log(error);
                    // throw err;

                }
                else{
                    console.log("serice provider table successfully created");
                    console.log(results);   
                }
            });


            con.query(createpropertiestable, function(error,results){
                if (error){
                    console.log(error);
                    // throw err;

                }
                else{
                    console.log("Properties table successfully created");
                    console.log(results);   
                }
            });

            con.query(createapartmentimagestable, function(error,results){
                if (error){
                    console.log(error);
                    // throw err;

                }
                else{
                    console.log("Apartements Images table successfully created");
                    console.log(results);   
                }
            });

            con.query(createaccesstokenstable, function(error,results){
                if (error){
                    console.log(error);
                    // throw err;

                }
                else{
                    console.log("Access Tokens table successfully created");
                    console.log(results);   
                }
            });

            con.query(createrefreshtokenstable, function(error,results){
                if (error){
                    console.log(error);
                    // throw err;

                }
                else{
                    console.log("Refesh Tokens table successfully created");
                    console.log(results);   
                }
            });
          

       
           
        }
        catch(error){
            console.log(error);

        }
     
      }
      createSqlTables();

  
    
        

        
    });

}


module.exports=populatedb;
