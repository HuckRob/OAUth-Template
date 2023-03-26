let express = require('express');
let indexRouter = require("./routes/index.js");
const { auth } = require("express-openid-connect");
require("dotenv").config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET, 
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER,
    clientSecret: process.env.CLIENT_SECRET,
    authorizationParams: {
      response_type: "code",
      audience: "http://localhost:5000", //The api we want our we aplication to talk to
      scope: "openid profile email",  //The information we want to get from the user
    },
  };



let app = express();
app.set("views", "views");
app.set("view engine", "ejs"); // set the view engine to esj templating engine
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); //this makes sure that anying in the public directory is loaded first
//authorization midleware
app.use(auth(config));//auth router attaches /login, /logout, and /callback routes to the baseURL

app.use("/", indexRouter);

app.listen(3000, () => {
    console.log("Express server is running on port 3000");
  });