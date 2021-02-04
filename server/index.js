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
  const xhr = new XMLHttpRequest();

  xhr.open("POST", "https://api.twitter.com/oauth/request_token");
  
  const AuthorizationHeaderString = createSignedHeader();  
  xhr.setRequestHeader("Authorization", AuthorizationHeaderString);
 
  xhr.addEventListener("load", function() { 
    const oauthToken = parseOAuthToken(this.responseText); 
    const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}` 
    response.location(url);
    response.status(302); 
    response.send(oauthToken); 
  })

  xhr.send(); 
}


app.get('/api/sign-in-with-twitter', (req, res) => { 
    getAuthToken(res); 


    //SWAPI DEV
    // const xhr = new XMLHttpRequest(); 

    // xhr.open("GET", "https://swapi.dev/api/people/1")
    // xhr.addEventListener("load", function() { 
    //   res.send(this.responseText); 
    // })
    // xhr.send(); 

  // TWITTER API 
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