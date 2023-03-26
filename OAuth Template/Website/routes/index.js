let express = require("express");
let router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const axios = require('axios');

router.get("/", (req, res) => {
  console.log(req.oidc.isAuthenticated()); // true if the user is authenticated through OAuth

  res.render("index", { // Render the index view
    title: "OAuth Web Template",
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});


//requiresAuth() is a middleware that checks if the user is authenticated/logged in
//if not, it redirects to the login page
router.get("/secured", requiresAuth(), async(req, res) => {
    let data = {};
    const{token_type, access_token} = req.oidc.accessToken;
    try{
      const apiResponse = await axios.get('http://localhost:5000/private',
      {
        headers:{
          authorization: `${token_type} ${access_token}`, //usually in the form of Bearer <token> we get this informaation when a user signs in
        }
      });
      data = apiResponse.data;
    }catch(e){
      console.log(e);
    }
    
    
    console.log(req.oidc.isAuthenticated());
        // Render the index view
      res.render("secured", {
        title: "Secure Page",
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
        data
      });
    });

module.exports = router;
