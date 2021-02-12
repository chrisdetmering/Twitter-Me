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
  //TODO: include oauth_consumer_key inside of default params
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
  //TODO: include oauth_consumer_key inside of default params
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

      //TODO: Make these signed cookies 
      const authCookies = [];

      for (const param in oauthParams) { 
        const authCookie = `${param}=${oauthParams[param]};`;
        authCookies.push(authCookie); 
      }

      res.header('Set-Cookie', authCookies);
      
    res.json(oauthParams); 
  });

  xhr.send(oauthVerifier); 
})


app.get("/api/profile-picture", (req, res) => { 
  const cookies = req.cookies;
  const userId = cookies.user_id;
  const method = "GET";
  const url = `https://api.twitter.com/1.1/users/show.json?user_id=${userId}`; 
  const isBearerAuth = true; 

  customFetch({method, url, isBearerAuth})
  .then(response => {
    const responseJSON = JSON.parse(response); 
    const profilePicUrl = responseJSON['profile_image_url_https']; 
    res.json(profilePicUrl); 
  })
  .catch(error => res.json(error)); 


  //  TODO: Parse the signed cookies 
  // const cookies = req.cookies;
  // const userId = cookies.user_id;
  // const xhr = new XMLHttpRequest();
  // const requestUrl = `https://api.twitter.com/1.1/users/show.json?user_id=${userId}`; 
 
  
  // xhr.open("GET", requestUrl);

  // xhr.setRequestHeader("Authorization", `Bearer ${process.env.BEARER_TOKEN}`);
 
  // xhr.addEventListener("load", function() { 
  //   const responseJSON = JSON.parse(this.responseText); 
  //   const profilePicUrl = responseJSON['profile_image_url_https']; 
  //   res.json(profilePicUrl); 
  // })

  // xhr.send(); 

})


function customFetch(options) { 
  const {
    method, 
    url, 
    body, 
    parameters, 
    isUserContextAuth, 
    isBearerAuth,
    oauthTokenSecret
  } = options; 
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);


  if (isBearerAuth) { 
    xhr.setRequestHeader("Authorization", `Bearer ${process.env.BEARER_TOKEN}`);
  }
  if (isUserContextAuth) { 
    const AuthorizationHeaderString = createSignedHeader(parameters, url, oauthTokenSecret, method);  
  xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Authorization", AuthorizationHeaderString);
  }

  const promise = new Promise((resolve, reject) => {
    xhr.addEventListener("load", function() { 
      //Twitter Api will send back an JSON object with a property errors
      if (JSON.parse(this.responseText)["errors"]) { 
        reject(this.responseText);
      } else { 
        resolve(this.responseText); 
      }
    })
    xhr.addEventListener("error", function() { 
      reject(this.responseText); 
    })
  })


  xhr.send(body);
  return promise; 
}







app.get("/api/home-timeline", (req, res) => { 
  //TODO: Parse the signed cookies 
  const cookies = req.cookies; 
  const oauthToken = cookies.oauth_token; 
  const oauthTokenSecret = cookies.oauth_token_secret; 
  const method = "GET"; 
  // 
  const url = "https://api.twitter.com/1.1/statuses/home_timeline.json"; 
  const parameters = [ 
    {key:"oauth_consumer_key", value: process.env.OAUTH_CONSUMER_KEY},
    {key:"oauth_token", value: oauthToken}
  ]; 
  const isUserContextAuth = true; 

  const options = { 
    method,
    url, 
    parameters, 
    oauthTokenSecret,
    isUserContextAuth
  }



  customFetch(options)
  .then(response => {
    res.json(JSON.parse(response))
  })


  // const xhr = new XMLHttpRequest();
  // xhr.open(method, requestUrl);
  
  // const AuthorizationHeaderString = createSignedHeader(parameters, requestUrl, oauthTokenSecret, method);  
  // xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
  // xhr.setRequestHeader("Authorization", AuthorizationHeaderString);
  // xhr.addEventListener("load", function() { 
  
  //  res.json(JSON.parse(this.responseText)); 
  // })

  // xhr.send(); 
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