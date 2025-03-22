require("@babel/register")({
    presets: ["@babel/preset-env", "@babel/preset-react"],
    "plugins": [
      [
        "transform-assets",
        {
          "extensions": [
            "css",
            "svg",
            "png",
          ],
          "name": "static/media/[name].[hash:8].[ext]"
        }
      ]
    ]
  });
  
  require("dotenv").config()
  // const mongoose= require("mongoose")
  const express = require("express")
  const createError= require("http-errors")
  const helmet= require("helmet")
  const compression= require('compression') 
  const path= require("path")
  const cors=require("cors")
  const multer=require("multer")
  const fs=require("fs");
  const axios=require("axios");
  // const cors=require("cors")
  // const http= require('http')
  // app.use(cors({
  //   corsOptions={

  //   }
  // }))

  

  const app= express()
  app.use(express.json())

  


corsOptions=cors({
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Access-Control-Allow-": "Authorization, Content-Type",
  "Access-Control-Allow-Credentials": "true"
});
  
  // Enable CORS for specific origin

app.use(corsOptions);




// //Cors/// Cross-Origin-Resource-Sharing
// corsOptions={
//     origin:"Access-Control-Allow-Origin", 
//     origin:"*",
//     credentials:"false",
//     optionSuccessStatus:200
//   }

// app.use(cors(corsOptions))

  
  // const React = require("react");
  // const ReactDOMServer = require("react-dom/server");
  // const App = require("../../pmsclient/src/App").default
  
  // const fs = require("fs");
  
  
  // const jwt=
  
  
  
  // require("jsonwebtoken")
  
  const auth=require("../middlewares/authentification")
  
  const cookieParser = require("cookie-parser")
  
  // configure server

  //set the roots to be used for the app
  const oAuth2=require("../oauthcallback");
  const refreshTokens=require("../routes/tokensRouter")
  const loginRouter= require ("../routes/loginRouter")
  // const indexRouter= require("../routes/indexRouter")
   const signupRouter= require("../routes/signupRouter")
  const verifyemailRouter=require("../routes/verifyemailRouter")
  // const passwordresetRouter= require("../routes/passwordresetRouter")
  const propertyManagerRouter= require("../routes/propertymanagerRouter")





  //const landLordRouter= require("./routes/landlordRouter")
  //const tenantRouter= require("./routes/tenantRouter")
  //const maintenanceRouter= require("./routes/maintenanceRouter")
  
  
   
  
   //Mysql connection starts here 
  
  
   
   var populatedDatabase= require("../populatedb");
   populatedDatabase();
   
 
  
 
  
  
  //Middlewares
  //body parser and urlencode


  app.use(express.urlencoded({extended:false}))
  
  
  
  
  
  //const indexhtmlpath= path.join( publicPath,'pmsclient')
  
  //set views and public folder for use
  //app.set(express.static(path.join(__dirname, "public")))
  app.set("views", path.join(__dirname, 'views'))
  app.set("view engine", "ejs")
  
  
    
  //Cors 
  // app.use(cors(corsOptions))
  
  /*
  const index=()=>{
   console.log("Please work man am loosing it")
    sendFile("hey what the fuck man!!")
    
  }




  */
 //use url paths as middlewares
 //  app.use("/", indexRouter)
 // app.use("/o/auth/passwordreset",  passwordresetRouter)
 app.use("/o/auth/login",   loginRouter)
 app.use("/o/auth/verify", verifyemailRouter)
 app.use("/o/auth/signup",  signupRouter)
 app.use("/o/auth/refreshtokens", refreshTokens);
 app.use("/oauthcallback", oAuth2);
 
 app.use(auth);
 
  app.use("/properties", propertyManagerRouter)
  
  /*app.use("/landlord", landLordRouter)
  
  app.use("/tenant", tenantRouter)
  app.use("/maintenance", maintenanceRouter)
  */
  
  
  //middlewares
  app.use(compression())
  app.use(helmet())
  app.use(cookieParser())
  
  
  // Example using Express.js
  app.get('/oauthcallback', (req, res) => {
  console.log('OAuth Callback Request:', req.query);
  // Handle code exchange here
  });







//Mpesa Apis Beginnss Here...Oh..so Excited\\





// https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl







// *** Authorization Request in NodeJS ***|
 
// var unirest = require("unirest");
// var req = unirest("GET", "https://sandbox.safaricom.co.ke/oauth/v1/generate");
 
// req.query({
//  "grant_type": "client_credentials"
// });
 
// req.headers({
//  "Authorization": "Basic SWZPREdqdkdYM0FjWkFTcTdSa1RWZ2FTSklNY001RGQ6WUp4ZVcxMTZaV0dGNFIzaA=="
// });
 
// req.end(res => {
//  if (res.error) throw new Error(res.error);
//  console.log(res.body);
// });







const generateAccessToken = async () => {
  const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate";
  const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString("base64");

  try {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Basic ${auth}` },
    });
    return data.access_token;
  } catch (error) {
    console.error("OAuth Error:", error.response?.data || error.message);
    return null;
  }
  
}



app.post("/stk-push", async (req, res) => {
  const accessToken = await generateAccessToken();
  if (!accessToken) return res.status(500).send("Failed to get token");

  const timestamp = new Date().toISOString().replace(/[-:T.]/g, "").slice(0, 14);
  const password = Buffer.from(`${process.env.MPESA_PAYBILL}${process.env.MPESA_PASSKEY}${timestamp}`).toString("base64");

  const payload = {
    BusinessShortCode: process.env.MPESA_PAYBILL,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: 5000, // Example rent amount
    PartyA: process.env.TENANT_MPESA_PHONE_NUMBER,
    PartyB: process.env.MPESA_PAYBILL,
    PhoneNumber: process.env.TENANT_MPESA_PHONE_NUMBER,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: "Rent Payment",
    TransactionDesc: "Payment for Apartment 101",
  };

  try {
    const { data } = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    res.json(data);
  } catch (error) {
    console.error("STK Push Error:", error.response?.data || error.message);
    res.status(500).send("Failed to initiate payment");
  }
});




app.post("/callback", (req, res) => {
  console.log("M-Pesa Callback:", JSON.stringify(req.body, null, 2));

  const { Body } = req.body;
  if (Body?.stkCallback?.ResultCode === 0) {
    const metadata = Body.stkCallback.CallbackMetadata.Item.reduce((acc, item) => {
      acc[item.Name] = item.Value;
      return acc;
    }, {});

    console.log("✅ Payment Success:", metadata);
  } else {
    console.log("❌ Payment Failed:", Body.stkCallback.ResultDesc);
  }

  res.sendStatus(200);
});



// https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials





  //const renderToString  =require('react-dom/server');
  
  
  // const publicPath = path.join(__dirname, "../pmsclient");
  
  // app.get("/*", (req, res, next) => {
  //   console.log(`Request URL = ${req.url}`);
  //   if (req.url !== '/') {
  //     return next();
  //   }
  //   const reactApp = ReactDOMServer.renderToString(React.createElement(App));
  //   console.log(reactApp);
    
  //   const indexFile = path.resolve(publicPath, "build", "index.html");
  //   console.log("this is the indexfile route:", indexFile)
  //   fs.readFile(indexFile, "utf8", (err, data) => {
  //     if (err) {
  //       const errMsg = `There is an error: ${err}`;
  //       console.error(errMsg);
  //       return res.status(500).send(errMsg);
  //     }
  
  //     return res.send(
  //       data.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
  //     );
  //   });
  // });
  
  
  app.use(express.static(path.join(__dirname, "../pmsclient", "build")));
  app.use(express.static((path.join(__dirname, "public" ))));














 // *****************Multer Configuration part of the code here****************
//   const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//       cb(null, "uploads/");
//     },

//     filename:function(req,file,cb){
//       cb(null, "file.originalname");

//     }
//   })

//   const upload=multer({ storage:storage});

// app.post("/upload",upload.single("image"), (req,res)=>{
//   const imagePath = 'uploads/' + req.file.originalname; // adjust this based on your file storage configuration
//   connection.query('INSERT INTO images (image_path) VALUES (?)', [imagePath], (error, results) => {
//     if (error) throw error;
//     res.send('Image uploaded successfully.');
//   });
// })
  
// *****************Multer Configuration part of the code here****************
 


//  // Upload to Bunny.net
//  const uploadToBunny = async (filePath, fileName) => {
//      const fileData = fs.readFileSync(filePath);
 
//      try {
//          const response = await axios.put(
//              `${BUNNY_STORAGE_URL}${fileName}`,
//              fileData,
//              {
//                  headers: {
//                      "AccessKey": BUNNY_ACCESS_KEY,
//                      "Content-Type": "application/octet-stream",
//                  },
//              }
//          );
//          return `https://YOUR_PULL_ZONE.b-cdn.net/${fileName}`; // CDN URL
//      } catch (error) {
//          console.error("Bunny Upload Error:", error.response.data);
//          throw new Error("Failed to upload image");
//      }
//  };
 
 // Handle Image Upload
//  app.post("/upload", upload.single("image"), async (req, res) => {
//      try {
//          const filePath = req.file.path;
//          const fileName = req.file.originalname;
 
//          const imageUrl = await uploadToBunny(filePath, fileName);
 
//          fs.unlinkSync(filePath); // Remove local temp file
 
//          res.json({ success: true, url: imageUrl });
//      } catch (error) {
//          res.status(500).json({ success: false, message: error.message });
//      }
//  });
 




//********************Multiple uploads for Multer*************
 // Handle Multiple Image Uploads
 

 const upload = multer({ dest: "uploads/" }); // Temp folder
 
 const BUNNY_STORAGE_URL = "https://storage.bunnycdn.com/easyclicksimages-storage/";
 const BUNNY_ACCESS_KEY = "d3ff2e39-bb6b-4686-aac7a14a2cf7-3295-4852";
  
 
 
 app.post("/upload", upload.array("images", 20), async (req, res) => {
  try {
      if (!req.files || req.files.length === 0) {
          return res.status(400).json({ success: false, message: "No files uploaded empty Request " });
      }

      console.log("Here are the image files " ,req.files);
      const imageUrls = await uploadToBunny(req.files);
      // res.json({ success: true, urls: req.files });
      res.json({message:"successfully recieved your sent photos", success: true,urls:imageUrls });

      
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
  }
});


 
 // Upload to Bunny.net (Mehrere Dateien)
 const uploadToBunny = async (files) => {
  let uploadedImages = [];

  console.log("Here we are in the Bunny SHit")

  for (let file of files) {
      const filePath = file.path;
      const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "_")}`;
      const fileData = fs.readFileSync(filePath);


      console.log("file path",filePath);

      console.log("file Name",fileName);
      console.log("file Data",fileData);

      try {
          await axios.put(
              `${BUNNY_STORAGE_URL}${fileName}`,
              fileData,
              {
                  headers: {
                      "AccessKey": BUNNY_ACCESS_KEY,
                      "Content-Type": "application/octet-stream",
                  },
              }
          );

          uploadedImages.push(`https://Europe(Falkenstein).b-cdn.net/${fileName}`); // CDN URL speichern
          
      } catch (error) {
          console.error(`Fehler beim Hochladen von ${fileName}:`, error.response?.data || error.message);
      } finally {
          fs.unlinkSync(filePath); // Temp-Datei löschen
      }
  }

  console.log("uploaded images here is the LIst  ", uploadedImages);

  return uploadedImages;
};

  



 
 
 

//  *******************Multiple Images to bunny Upload ********** 
  /*
  app.get("/", (req, res, next) => {
    Reactrender();
    console.log("we should now be able to render, oder ?")
    
  });
  app.get("/", (req, res) => {
    fs.readFile(path.join(publicPath, "public", "index.html"), "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("An error occurred");
      }
  
      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
        )
      );
    });
  });
  app.use((req, res, next) => {
   res.sendFile(path.join(publicPath, "public", "index.html"));
  })
  
  });
  
  const clientpath=path.join(__dirname, "/public")
  app.use(express.static(clientpath));
  */
  
  
  //const indexhtml=  path.join(publicPath, "index.html");
  
  //console.log(path.join(publicPath, "index.html"));
  //console.log(public);
  //onsole.log(__dirname);
  //console.log(publicPath);
  
  /*
  app.get('/', (req,res)=>{
    console.log(__dirname, "pmsclient");
    res.sendFile(path.join(publicPath, "public", "index.html"));
  }
  )
  */
  //This will create a middleware.
  //When you navigate to the root page, it would use the built react-app
  
  
  //catch 404 error and foward to error handler
  /*app.use(function(req, res,next){
      next(createError(404));  
    })
  
    //error handler 
    /*
    
    app.use((err,req, res, next)=>{
        //render the error page
        res.status(err.status|| 500);
          console.log( "there was an error with the Server")
    })
   */
  
  //server(app)
  
  
  const port= process.env.PORT || 8000;
  app.listen(port, ()=>{`${console.log(`The PMS Server has successfully started in Port ${port}`)}`})
  
  
  //server()