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
  const customFetch = require('./customFetch'); 


app.use(express.static(path.join(__dirname, '../client', 'build')));
app.use(cookieParser()); 

app.get('/api/sign-in-with-twitter', (req, res) => { 
  
  const url = "https://api.twitter.com/oauth/request_token"; 
  //TODO: include oauth_consumer_key inside of default params
  const parameters = [ 
    {key:"oauth_consumer_key", value: process.env.OAUTH_CONSUMER_KEY},
    {key:"oauth_callback", value: process.env.OAUTH_CALLBACK}
  ]; 
  const method = "POST"; 
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    const AuthorizationHeaderString = createSignedHeader(parameters, url, undefined, method);  
    xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", AuthorizationHeaderString);
  
    xhr.addEventListener("load", function() { 
      
      const oauthParams = parseOAuthParams(this.responseText); 
      console.log(oauthParams);
    const oauthTokenValue = oauthParams["oauth_token"]; 
    
    const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${this.responseText}`; 
    res.send(AuthorizationHeaderString); 
     
    })
   


  xhr.send();




////Twitter Api will send back an JSON object with a property errors
      //Not sure why I had to JSON.stringify this in order to 
      //make the /api/access-token endpoint work 

  // const options = { 
  //   parameters, 
  //   isUserContextAuth: true,
  // }

  // customFetch("POST", url, options)
  // .then(response => { 
  //   console.log(response); 
  //   const oauthParams = parseOAuthParams(response); 
    
  //   const oauthTokenValue = oauthParams["oauth_token"]; 
 
  //   const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthTokenValue}`; 
  //   res.send(url); 
  // })
  // .catch(error => res.send(error))
})

//Cause 
//1. Something wrong with customFetch 
//2. Something wrong with environment vars

app.get("/api/access-token", (req, res) => { 
  const oauthToken = req.query.oauth_token; 
  const body = `oauth_verifier=${req.query.oauth_verifier}`; 
  
  const url = "https://api.twitter.com/oauth/access_token"; 
  //TODO: include oauth_consumer_key inside of default params
  const parameters = [ 
    {key:"oauth_consumer_key", value: process.env.OAUTH_CONSUMER_KEY},
    {key:"oauth_token", value: oauthToken}
  ]; 
  const method = "POST"

  const options = { 
    parameters,
    body, 
    isUserContextAuth: true
  }

  customFetch(method, url, options)
  .then(response => { 

    const oauthParams = parseOAuthParams(response); 

      //TODO: Make these signed cookies 
      const authCookies = [];

      for (const param in oauthParams) { 
        const authCookie = `${param}=${oauthParams[param]};`;
        authCookies.push(authCookie); 
      }

      res.header('Set-Cookie', authCookies);
      
    res.json(oauthParams); 
  }) 
})


app.get("/api/profile-picture", (req, res) => { 
  //  TODO: Parse the signed cookies 
  const cookies = req.cookies;
  const userId = cookies.user_id;
  const method = "GET";
  const url = `https://api.twitter.com/1.1/users/show.json?user_id=${userId}`; 
  const isBearerAuth = true; 

  customFetch(method, url, {isBearerAuth})
  .then(response => {
    const responseJSON = JSON.parse(response); 
    const profilePicUrl = responseJSON['profile_image_url_https']; 
    res.json(profilePicUrl); 
  })
  .catch(error => res.json(error)); 
})



app.get("/api/home-timeline", (req, res) => { 
  //TODO: Parse the signed cookies 
  const cookies = req.cookies; 
  const oauthToken = cookies.oauth_token; 
  const oauthTokenSecret = cookies.oauth_token_secret; 
  const method = "GET"; 
  const url = "https://api.twitter.com/1.1/statuses/home_timeline.json"; 
  const parameters = [ 
    {key:"oauth_consumer_key", value: process.env.OAUTH_CONSUMER_KEY},
    {key:"oauth_token", value: oauthToken}
  ]; 
  const isUserContextAuth = true; 
  const options = { 
    parameters, 
    oauthTokenSecret,
    isUserContextAuth
  }

  customFetch(method, url, options)
  .then(response => {
    res.json(JSON.parse(response))
  })
  .catch(error => { 
    res.json(error); 
  })
 
})



app.get("/api/trends", (req, res) => { 
  //TODO: Parse the signed cookies 
  const cookies = req.cookies; 
  const oauthToken = cookies.oauth_token; 
  const oauthTokenSecret = cookies.oauth_token_secret; 
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
  
   res.json(JSON.parse(this.responseText)); 
  })

  xhr.send(); 
})



app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html')); 
})


app.listen(PORT, () => console.log(`Server Listening on ${PORT} `)); 