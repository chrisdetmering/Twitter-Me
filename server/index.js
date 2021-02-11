const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require("express"); 
const path = require("path"); 
const app = express(); 
const PORT = process.env.PORT || 8080; 
const { 
  createSignedHeader, 
  parseOAuthParams
  } = require("./twitterOAuthSignature"); 





app.use(express.static(path.join(__dirname, '../client', 'build')));



app.get('/api/sign-in-with-twitter', (req, res) => { 
  const xhr = new XMLHttpRequest();
  const requestUrl = "https://api.twitter.com/oauth/request_token"; 
  const parameters = [ 
    {key:"oauth_consumer_key", value: process.env.OAUTH_CONSUMER_KEY},
    {key:"oauth_callback", value: process.env.OAUTH_CALLBACK}
  ]; 

  xhr.open("POST", requestUrl);
  
  const AuthorizationHeaderString = createSignedHeader(parameters, requestUrl);  
  xhr.setRequestHeader("Authorization", AuthorizationHeaderString);
 
  xhr.addEventListener("load", function() { 
    const oauthParams = parseOAuthParams(this.responseText); 
    const oauthTokenValue = oauthParams["oauth_token"]; 

    const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthTokenValue}`; 
  
    res.send(url); 
  })

  xhr.send(); 
})


app.get("/api/access-token", (req, res) => { 
  const oauthToken = req.query.oauth_token; 
  const oauthVerifier = `oauth_verifier=${req.query.oauth_verifier}`; 
  const xhr = new XMLHttpRequest();
  const requestUrl = "https://api.twitter.com/oauth/access_token"; 
  const parameters = [ 
    {key:"oauth_consumer_key", value: process.env.OAUTH_CONSUMER_KEY},
    {key:"oauth_token", value: oauthToken}
  ]; 

  
  xhr.open("POST", requestUrl);
  
  const AuthorizationHeaderString = createSignedHeader(parameters, requestUrl);  
  xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Authorization", AuthorizationHeaderString);
 
  xhr.addEventListener("load", function() { 
    const oauthParams = parseOAuthParams(this.responseText); 
    //TODO: handle This feature is temporarily unavailable 

    res.json(oauthParams); 
  })

  xhr.send(oauthVerifier); 
})


app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html')); 
})


app.listen(PORT, () => console.log(`Server Listening on ${PORT} `)); 