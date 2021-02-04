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


const getAuthToken = (response) => { 
  const request = new XMLHttpRequest();
  request.open("POST", "https://api.twitter.com/oauth/request_token");
  const AuthorizationHeaderString = createSignedHeader(); 
  request.setRequestHeader("Authorization", AuthorizationHeaderString);

  request.addEventListener("load", function() { 
    const oauthToken = parseOAuthToken(this.responseText); 
    // const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}` 
    // res.location(url);
    // res.status(302); 
    response.send(oauthToken); 
  })
  
  
  request.send(); 
}


app.get('/api/sign-in-with-twitter', (req, res) => { 
    getAuthToken(res); 
  
  
  
  // const request = new XMLHttpRequest();
  // request.open("POST", "https://api.twitter.com/oauth/request_token");

  // //TODO: Handle errors
  // request.addEventListener("error", event => { 
  //   console.log("an error occurred");
  // })

  // request.addEventListener("load", function() { 
  //   const oauthToken = parseOAuthToken(this.responseText); 
  //   const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}` 
  //   res.location(url);
  //   res.status(302); 
  //   res.send(); 
  // })

  // const AuthorizationHeaderString = createSignedHeader(); 
  // request.setRequestHeader("Authorization", AuthorizationHeaderString);

  // request.send(); 
  // res.send('sign in with twitter')
})







app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html')); 
})



app.listen(PORT, () => console.log(`Server Listening on ${PORT} `)); 