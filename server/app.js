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
  // const cors=require("cors")
  // const http= require('http')
  // app.use(cors({
  //   corsOptions={

  //   }
  // }))

  

  const app= express()




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
  
  
  
  require("jsonwebtoken")
  
  const auth=require("../middlewares/authentification")
  
  const cookieParser = require("cookie-parser")
  
  // configure server
  
  
  //set the roots to be used for the app
  const oAuth2=require("../oauthcallback");
  const refreshTokens=require("../routes/tokensRouter")
  // const loginRouter= require ("../routes/loginRouter")
  // const indexRouter= require("../routes/indexRouter")
   const signupRouter= require("../routes/signupRouter")
  const verifyemailRouter=require("../routes/verifyemailRouter")
  // const passwordresetRouter= require("../routes/passwordresetRouter")
  // const propertyMangerRouter= require("../routes/propertymanagerRouter")





  //const landLordRouter= require("./routes/landlordRouter")
  //const tenantRouter= require("./routes/tenantRouter")
  //const maintenanceRouter= require("./routes/maintenanceRouter")
  
  
   
  
   //Mysql connection starts here 
  
  
   
   var populatedDatabase= require("../populatedb");
   populatedDatabase();
   
 
  
 
  
  
  //Middlewares
  //body parser and urlencode
  app.use(express.json())
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
  // app.use(auth);
  //use url paths as middlewares
  // app.use("/o/auth/passwordreset",  passwordresetRouter)
  // app.use("/o/auth/login",   loginRouter)
  app.use("/o/auth/verify", verifyemailRouter)
  app.use("/o/auth/signup",  signupRouter)
  app.use("/o/auth/refreshtokens", refreshTokens);
  //app.use("/", indexRouter)
  app.use("/oauthcallback", oAuth2);
  
  // app.use("/properties", propertyMangerRouter)
  
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


  const storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null, "uploads/");
    },

    filename:function(req,file,cb){
      cb(null, "file.originalname");

    }
  })

  const upload=multer({ storage:storage});

app.post("/upload",upload.single("image"), (req,res)=>{
  const imagePath = 'uploads/' + req.file.originalname; // adjust this based on your file storage configuration
  connection.query('INSERT INTO images (image_path) VALUES (?)', [imagePath], (error, results) => {
    if (error) throw error;
    res.send('Image uploaded successfully.');
  });
})
  
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