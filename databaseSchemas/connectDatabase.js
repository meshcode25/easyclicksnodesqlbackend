
var mysql = require('mysql');
  

function connectDatabase(){
        
    // var mysql = require('mysql');
    
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database:'easyClicksDatabase',
    });

    return con;

}

module.exports= connectDatabase;


    
    
// con.connect(function(err) {
//     if (err){ 
//             throw err;
//     }
//     else{
//         // async function createSqlTables(){
//         //     try{
//         //     }
//         //     catch(error){
//         //         console.log(error);
//         //     }
//         // }
//         console.log("sucessfully conected to database for QUERYING")
//         const connect=query
//     }
// })










// con.query(createcaretakerstable, function(error,results){
//     if (error){
//         console.log(error);
//         // throw err;

//     }
//     else{
//         console.log("caretakers table successfully created");
//         console.log(results);   
//     }
// });


    