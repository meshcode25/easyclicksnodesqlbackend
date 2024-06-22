

const verify=()=>{
 
 
    const  characters="8i90834f89483h3yhf4y0g7ch4cyjhq87ryx07924t6c0289tcyj20g4h03"

    var verificationToken="";


    for(let i=0; i<25; i++){
        verificationToken += characters[Math.floor(Math.random()*characters.length)]

    }

    return verificationToken
}


module.exports= verify

