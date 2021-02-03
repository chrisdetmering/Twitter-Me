const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require("express"); 
const path = require("path"); 
const app = express(); 
const PORT = process.env.PORT || 8080; 
const { createSignedHeader } = require("./twitterOAuthSignature"); 
const percentEncode = require("./percentEncode");  



const request = new XMLHttpRequest();
request.open("POST", "https://api.twitter.com/oauth/request_token")

request.addEventListener("error", event => { 
  console.log("an error occurred")
})

request.addEventListener("load", function(e) { 
  console.log(this.responseText); 
})

const AuthorizationHeaderString = createSignedHeader(); 
request.setRequestHeader("Authorization", AuthorizationHeaderString)

request.send(); 

app.use(express.static(path.join(__dirname, '../client', 'build')));

app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html')); 
})


app.get('/tweet', (req, res) => { 
  res.send('tweet'); 
})


app.listen(PORT, () => console.log(`Server Listening on ${PORT} `)); 