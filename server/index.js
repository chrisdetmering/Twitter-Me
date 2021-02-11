const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const cookieParser = require('cookie-parser');
const express = require("express"); 
const path = require("path"); 
const app = express(); 
const PORT = process.env.PORT || 8080; 
const { 
  createSignedHeader, 
  parseOAuthParams
  } = require("./twitterOAuthSignature"); 


app.use(express.static(path.join(__dirname, '../client', 'build')));
app.use(cookieParser()); 

//TODO: Refactor these endpoints to use a more general function for interacting with Twitter
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

    res.header('Set-Cookie', `auth=${this.responseText};`);
    
    res.json(oauthParams); 
  })

  xhr.send(oauthVerifier); 
})


app.get("/api/profile-picture", (req, res) => { 
  console.log(req.headers);
  const userId = req.query.user_id;
  const xhr = new XMLHttpRequest();
  const requestUrl = `https://api.twitter.com/1.1/users/show.json?user_id=${userId}`; 
 
  
  xhr.open("GET", requestUrl);

  xhr.setRequestHeader("Authorization", `Bearer ${process.env.BEARER_TOKEN}`);
 
  xhr.addEventListener("load", function() { 
    const responseJSON = JSON.parse(this.responseText); 
    const profilePicUrl = responseJSON['profile_image_url_https']; 
    res.json(profilePicUrl); 
  })

  xhr.send(); 

})


app.get("/api/home-timeline", (req, res) => { 
  const oauthToken = req.query.oauth_token; 
  const oauthTokenSecret = req.query.oauth_token_secret; 
  const method = "GET"; 
  const xhr = new XMLHttpRequest();
  const requestUrl = "https://api.twitter.com/1.1/statuses/home_timeline.json"; 
  const parameters = [ 
    {key:"oauth_consumer_key", value: process.env.OAUTH_CONSUMER_KEY},
    {key:"oauth_token", value: oauthToken}
  ]; 

  xhr.open(method, requestUrl);
  
  const AuthorizationHeaderString = createSignedHeader(parameters, requestUrl, oauthTokenSecret, method);  
  xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Authorization", AuthorizationHeaderString);
  xhr.addEventListener("load", function() { 
    console.log(req.headers.cookie);
   res.json(JSON.parse(this.responseText)); 
  })

  xhr.send(); 
})






app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html')); 
})


app.listen(PORT, () => console.log(`Server Listening on ${PORT} `)); 