const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require("express"); 
const path = require("path"); 
const app = express(); 
const PORT = process.env.PORT || 8080; 
const { 
  getOAuthOnce, 
  getSigningKey, 
  getParameterString, 
  getSignatureBaseString, 
  getSignature } = require("./twitterOAuthSignature"); 

const oauthOnce = getOAuthOnce(); 
const timeStamp = `${Date.now()}`; 
const parameterString = getParameterString(oauthOnce, timeStamp); 
const signingKey = getSigningKey(); 
const signatureBaseString = getSignatureBaseString(parameterString); 
const signature = getSignature(signingKey, signatureBaseString); 


const request = new XMLHttpRequest();
request.open("POST", "https://api.twitter.com/oauth/request_token")

app.use(express.static(path.join(__dirname, '../client', 'build')));

app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html')); 
})


app.get('/tweet', (req, res) => { 
  res.send('tweet'); 
})


app.listen(PORT, () => console.log(`Server Listening on ${PORT} `)); 