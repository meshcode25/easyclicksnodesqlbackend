
var uniquestring="qwertyuiopasdfghjklzxcvbnm1234567890"

const stringlength=27;

function generateUniqueId(){
    console.log(uniquestring);
    console.log(stringlength)

    let uniqueid="";

        for(let i=0;i<stringlength;i++){
            var randommathvalue=Math.floor(Math.random()*36);
            console.log(randommathvalue);
            uniqueid +=uniquestring[randommathvalue];
        }

    console.log("here is teh uniuew id  "+ uniqueid)
        return uniqueid
}



module.exports=generateUniqueId;