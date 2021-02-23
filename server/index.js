const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const cookieParser = require('cookie-parser');
const express = require("express"); 
const path = require("path"); 
const app = express(); 
const PORT = process.env.PORT || 8080; 
const { 
  parseOAuthParams
  } = require("./twitterOAuthSignature"); 
  const customFetch = require('./customFetch'); 
const TwitterApi = require('./TwitterAPI/TwitterAPI'); 
const users = require('./TwitterAPI/users'); 

app.use(express.static(path.join(__dirname, '../client', 'build')));
app.use(cookieParser()); 


//TODO: 
//4. take care of twitter sending technical error (HTML)

//steps for implementing Twitter API 
//3. Use TwitterApi for basic routes (in progress. 2 more routes)
//4. Handle errors 
//5. Test on heroku
//6. Redesign sign in flow to not have GetCredentials Component


app.get('/api/sign-in-with-twitter', (req, res) => { 
  
  const url = "https://api.twitter.com/oauth/request_token"; 
  const parameters = [ 
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
      const {
        user_id, 
        oauth_token, 
        oauth_token_secret
      } = oauthParams
      
      users[user_id] = [oauth_token, oauth_token_secret]; 


      res.header('Set-Cookie', `user_id=${user_id}`);
      
    res.json(oauthParams); 
  }) 
})





app.get("/api/profile-picture", (req, res) => { 
  const cookies = req.cookies;
  const userId = cookies.user_id;
  const url = `https://api.twitter.com/1.1/users/show.json`; 
  const query = {"user_id": userId };
  const [oauth_token, oauth_token_secret] = users[userId]; 

  const twAPI = new TwitterApi(); 
  twAPI.setAuthToken(oauth_token); 
  twAPI.setAuthTokenSecret(oauth_token_secret); 
 
  twAPI.get(url, query)
  .then(response => {
    const profilePicUrl = response['profile_image_url_https']; 
    res.json(profilePicUrl); 
  })
})


app.get("/api/profile-info", (req, res) => { 
  const cookies = req.cookies;
  const userId = cookies.user_id;
  const url = `https://api.twitter.com/1.1/users/show.json`; 
  const query = {"user_id": userId };
  const [oauth_token, oauth_token_secret] = users[userId]; 

  const twAPI = new TwitterApi(); 
  twAPI.setAuthToken(oauth_token); 
  twAPI.setAuthTokenSecret(oauth_token_secret); 
 
  twAPI.get(url, query)
  .then(response => {
    res.json(response)
  })
 

})




// app.get("/api/profile-info", (req, res) => { 
//   const cookies = req.cookies;
//   const userId = cookies.user_id;
//   const method = "GET";
//   const url = `https://api.twitter.com/1.1/users/show.json?user_id=${userId}`; 
//   const isBearerAuth = true; 

//   customFetch(method, url, {isBearerAuth})
//   .then(response => {
//     const responseJSON = JSON.parse(response); 
//     res.json(responseJSON); 
//   })

// })




app.get("/api/home-timeline", (req, res) => { 
  const url = "https://api.twitter.com/1.1/statuses/home_timeline.json"
  const cookies = req.cookies;
  const userId = cookies.user_id;
  const [oauth_token, oauth_token_secret] = users[userId]; 

  const twAPI = new TwitterApi(); 
  twAPI.setAuthToken(oauth_token); 
  twAPI.setAuthTokenSecret(oauth_token_secret); 
 
  twAPI.get(url)
  .then(response => {
    res.json(response)
  })
})

//get trends in the United States. Need to make this more dynamic
app.get("/api/trends", (req, res) => { 
  const url = "https://api.twitter.com/1.1/trends/place.json"; 
  const query = {"id": "23424977"}; 
  const cookies = req.cookies;
  const userId = cookies.user_id;
  const [oauth_token, oauth_token_secret] = users[userId]; 

  const twAPI = new TwitterApi(); 
  twAPI.setAuthToken(oauth_token); 
  twAPI.setAuthTokenSecret(oauth_token_secret); 


  twAPI.get(url, query)
  .then(response => { 
    res.json(response); 
  })
})

app.get("/api/search", (req, res) => { 
  const url = "https://api.twitter.com/1.1/search/tweets.json"; 
  const query = {"q": req.query.q }
  const cookies = req.cookies;
  const userId = cookies.user_id;
  const [oauth_token, oauth_token_secret] = users[userId]; 

  const twAPI = new TwitterApi(); 
  twAPI.setAuthToken(oauth_token); 
  twAPI.setAuthTokenSecret(oauth_token_secret); 

  twAPI.get(url, query)
  .then(response => {
    res.json(response); 
  })
})

app.get("/api/status/update", (req, res) => { 
  const url = "https://api.twitter.com/1.1/statuses/update.json";
  const query = {"status":req.query.status}
  const cookies = req.cookies;
  const userId = cookies.user_id;
  const [oauth_token, oauth_token_secret] = users[userId]; 

  const twAPI = new TwitterApi(); 
  twAPI.setAuthToken(oauth_token); 
  twAPI.setAuthTokenSecret(oauth_token_secret); 

  twAPI.post(url, query)
  .then(response => { 
    res.json(response);
  })
})



app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html')); 
})


app.listen(PORT, () => console.log(`Server Listening on ${PORT} `)); 