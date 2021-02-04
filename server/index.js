const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require("express"); 
const path = require("path"); 
const app = express(); 
const PORT = process.env.PORT || 8080; 
const { 
  createSignedHeader, 
  parseOAuthToken
  } = require("./twitterOAuthSignature"); 
  const percentEncode = require("./percentEncode"); 




app.use(express.static(path.join(__dirname, '../client', 'build')));



app.get('/api/sign-in-with-twitter', (req, res) => { 
  const xhr = new XMLHttpRequest();

  xhr.open("POST", "https://api.twitter.com/oauth/request_token");
  
  const AuthorizationHeaderString = createSignedHeader();  
  xhr.setRequestHeader("Authorization", AuthorizationHeaderString);
 
  xhr.addEventListener("load", function() { 
    const oauthToken = parseOAuthToken(this.responseText); 
    const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}` 
  
    res.send(url); 
  })

  xhr.send(); 
})


app.get("/api/access-token", (req, res) => { 
  res.send(req.query); 
})


app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html')); 
})


app.listen(PORT, () => console.log(`Server Listening on ${PORT} `)); 