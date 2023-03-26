const express = require("express");
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');



//Make sure to add the issuerBaseURL and audience to the auth function
//The audience is the the URL that you are hosting this api on
//The issuer is the URL of the Auth0 tenant
const jwtCheck = auth({
    audience: 'http://localhost:5000', // The audience is the the URL that you are hosting this api on
    issuerBaseURL: '', // The issuer is the URL of the Auth0 tenant
    tokenSigningAlg: 'RS256'    // The algorithm that was used to sign the token
  });


//app.use(jwtCheck)Telles the whole app to use the jwtCheck middleware 
//only have this run if you want all endpoints to be protected
//otherswise you can add it to the specific endpoints that you want to protect
//app.use(jwtCheck); 

app.get("/public", (req, res) => {
  res.json({
    type: "public",
  });
});



//jtwtCheck is a middleware that will check if the token is valid
//If the token is valid, the request will continue to the next middleware
app.get("/private",jwtCheck, (req, res) => {
    res.json({
      type: "private",
    });
  });

app.listen(5000);
