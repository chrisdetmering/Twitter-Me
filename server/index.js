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


//TODO: 
//1. put oauth_consumer_key as default param 
//2. set cookies to be signed 
//3. parse signed cookies 
//4. take care of twitter sending technical error (HTML)

//TODO: 
//Questions for Drew
//1. How should I save my authTokens for requests 
//2. How should I hide all the logic with my interaction with twitter 
//3. 
app.get('/api/sign-in-with-twitter', (req, res) => { 
  
  const url = "https://api.twitter.com/oauth/request_token"; 
  const parameters = [ 
    {key:"oauth_consumer_key", value: process.env.OAUTH_CONSUMER_KEY},
    {key:"oauth_callback", value: process.env.OAUTH_CALLBACK}
  ]; 
  const options = { 
    parameters, 
    isUserContextAuth: true,
  }

  customFetch("POST", url, options)
  .then(response => { 
    const oauthParams = parseOAuthParams(response); 
    const oauthTokenValue = oauthParams["oauth_token"]; 
 
    const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthTokenValue}`; 
    res.send(url); 
  })
  .catch(error => res.send(error))
})



app.get("/api/access-token", (req, res) => { 
  const oauthToken = req.query.oauth_token; 
  const body = `oauth_verifier=${req.query.oauth_verifier}`; 
  
  const url = "https://api.twitter.com/oauth/access_token"; 
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
  const cookies = req.cookies;
  const userId = cookies.user_id;
  const method = "GET";
  const url = `https://api.twitter.com/1.1/users/show.json?user_id=${userId}`; 
  const isBearerAuth = true; 

  customFetch(method, url, {isBearerAuth})
  .then(response => {
    const responseJSON = JSON.parse(response); 
    console.log(responseJSON);
    const profilePicUrl = responseJSON['profile_image_url_https']; 
    res.json(profilePicUrl); 
  })

})

app.get("/api/profile-info", (req, res) => { 
  const cookies = req.cookies;
  const userId = cookies.user_id;
  const method = "GET";
  const url = `https://api.twitter.com/1.1/users/show.json?user_id=${userId}`; 
  const isBearerAuth = true; 

  customFetch(method, url, {isBearerAuth})
  .then(response => {
    const responseJSON = JSON.parse(response); 
    res.json(responseJSON); 
  })

})




app.get("/api/home-timeline", (req, res) => { 
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

//experimenting with using a class for twitter api
class TwitterApi { 
  constructor(baseUrl) { 
    this.baseUrl = baseUrl
    this.parameters = []
    this.oauth_token = null
    this.oauth_token_secret = null
  }
  
  setParameters(parameters) { 
    this.parameters = parameters; 
  }

  setAuthToken(oauthToken) { 
    this.oauth_token = oauthToken; 
  }
  setAuthTokenSecret(oauthTokenSecret) { 
    this.oauth_token_secret = oauthTokenSecret; 
  }

  
 request(method, url, data) { 
    const xhr = new XMLHttpRequest(); 

    xhr.open(method, url);
    
    const AuthorizationHeaderString = createSignedHeader(this.parameters, this.baseUrl, this.oauth_token_secret, method);  
    console.log(AuthorizationHeaderString)
    xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", AuthorizationHeaderString);
    
    const promise = new Promise((resolve, reject) => { 
      xhr.addEventListener("load", function() { 
        const response = JSON.parse(this.responseText); 
        resolve(response); 
      })
      xhr.addEventListener("error", function() { 
        reject(this.responseText); 
      })

    })
    
  
    xhr.send(data); 
    return promise; 
  }


  //get 
  get(queryParam) { 
    const url = this.baseUrl + queryParam; 
    console.log(url)
    return this.request("GET", url); 
  }

  //post
  post(endpoint, body) { 

  }
} 

const tw = new TwitterApi("https://api.twitter.com/1.1/trends/place.json")
//get trends in the United States
app.get("/api/trends", (req, res) => { 
  
  const cookies = req.cookies; 
  const { oauth_token, oauth_token_secret } = cookies; 
  

  tw.setParameters([ 
      {key:"oauth_consumer_key", value: process.env.OAUTH_CONSUMER_KEY},
      {key:"oauth_token", value: oauth_token}, 
      {key: "id", value: '23424977'}
    ])

  tw.setAuthToken(oauth_token); 
  tw.setAuthTokenSecret(oauth_token_secret)
  tw.get("?id=23424977")
  .then(response => { 
    res.json(response); 
  })



  //  const method = "GET"; 
  // const url = "https://api.twitter.com/1.1/trends/place.json?id=23424977"; 
  // const baseUrl = "https://api.twitter.com/1.1/trends/place.json"; 
  // const parameters = [ 
  //   {key:"oauth_consumer_key", value: process.env.OAUTH_CONSUMER_KEY},
  //   {key:"oauth_token", value: oauth_token}, 
  //   {key: "id", value: '23424977'}
  // ]; 
  // const xhr = new XMLHttpRequest(); 

  // xhr.open(method, url);
  
  // const AuthorizationHeaderString = createSignedHeader(parameters, baseUrl, oauth_token_secret, method);  
  // console.log(AuthorizationHeaderString)
  // xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
  // xhr.setRequestHeader("Authorization", AuthorizationHeaderString);
  

  // xhr.addEventListener("load", function() { 
  //   const response = JSON.parse(this.responseText); 
  //   res.json(response); 
  // })

  // xhr.send(); 

})


//search twitter
app.get("/api/search", (req, res) => { 
  const cookies = req.cookies; 
  const { oauth_token, oauth_token_secret } = cookies; 
  const q = req.query.q
  const method = "GET"; 
  const url = `https://api.twitter.com/1.1/search/tweets.json?q=${q}`; 
  const baseUrl = "https://api.twitter.com/1.1/search/tweets.json"; 
  const parameters = [ 
    {key:"oauth_consumer_key", value: process.env.OAUTH_CONSUMER_KEY},
    {key:"oauth_token", value: oauth_token}, 
    {key: "q", value: q}
  ]; 


  const xhr = new XMLHttpRequest(); 

  xhr.open(method, url);
  
  const AuthorizationHeaderString = createSignedHeader(parameters, baseUrl, oauth_token_secret, method);  
  xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Authorization", AuthorizationHeaderString);
  

  xhr.addEventListener("load", function() { 
    
    const response = JSON.parse(this.responseText); 
    console.log(response); 
    res.json(response); 
  })

  xhr.send(); 

})







//post Tweet
app.get("/api/status/update", (req, res) => { 
  const newTweet = req.query.status; 
  const cookies = req.cookies; 
  const { oauth_token, oauth_token_secret } = cookies; 
  const method = "POST"; 
  const url = `https://api.twitter.com/1.1/statuses/update.json?status=${newTweet}`; 
  const baseUrl = "https://api.twitter.com/1.1/statuses/update.json"; 
  const parameters = [ 
    {key:"oauth_consumer_key", value: process.env.OAUTH_CONSUMER_KEY},
    {key:"oauth_token", value: oauth_token}, 
    {key:"status", value: newTweet}
  ]; 


  const xhr = new XMLHttpRequest(); 
  xhr.open(method, url);
  
  const AuthorizationHeaderString = createSignedHeader(parameters, baseUrl, oauth_token_secret, method);  
  xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Authorization", AuthorizationHeaderString);
  

  xhr.addEventListener("load", function() { 
    res.json(this.responseText); 
  })

  xhr.send(); 

})



app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html')); 
})


app.listen(PORT, () => console.log(`Server Listening on ${PORT} `)); 