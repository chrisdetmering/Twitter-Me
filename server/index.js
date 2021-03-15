const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const cookieParser = require('cookie-parser');
const express = require("express"); 
const path = require("path"); 
const app = express(); 
const PORT = process.env.PORT || 8080; 
const {parseOAuthParams} = require("./TwitterAPI/twitterOAuthSignature"); 
const TwitterApi = require('./TwitterAPI/TwitterAPI'); 
const users = require('./TwitterAPI/users'); 

app.use(express.static(path.join(__dirname, '../client', 'build')));
app.use(cookieParser()); 

app.get('/api/sign-in-with-twitter', (req, res) => { 
  const url = "https://api.twitter.com/oauth/request_token"; 
  const twAPI = new TwitterApi(); 
  twAPI.setParameter('oauth_callback', process.env.OAUTH_CALLBACK)

  twAPI.post(url)
  .then(response => { 
    const oauthParams = parseOAuthParams(response); 
    const oauthTokenValue = oauthParams["oauth_token"]; 

    res.send(`https://api.twitter.com/oauth/authenticate?oauth_token=${oauthTokenValue}`); 
  })
})



app.get("/api/access-token", (req, res) => { 
  const oauthToken = req.query.oauth_token; 
  const body = `oauth_verifier=${req.query.oauth_verifier}`; 

  const url = "https://api.twitter.com/oauth/access_token"; 
  const twAPI = new TwitterApi(); 
  twAPI.setParameter('oauth_token', oauthToken)

  twAPI.post(url, undefined, body)
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


// app.get("get")




app.get("/api/users/profile-picture", (req, res) => { 
  const {screen_name} = req.query; 
  const url = `https://api.twitter.com/1.1/users/show.json?screen_name=${screen_name}`

  const xhr = new XMLHttpRequest()
  xhr.open("Get", url); 
  xhr.setRequestHeader("Authorization", `Bearer ${process.env.BEARER_TOKEN}`); 
  xhr.addEventListener("load", function() { 
    const json = JSON.parse(this.responseText);
    const profilePicUrl = json['profile_image_url_https']; 
    res.json(profilePicUrl); 
  })

  xhr.send(); 
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
    const json = JSON.parse(response);
    const profilePicUrl = json['profile_image_url_https']; 
    res.json(profilePicUrl); 
  })
})


app.get("/api/profile-details", (req, res) => { 
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
    const json = JSON.parse(response);
    res.json(json)
  })
 

})



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
    const json = JSON.parse(response);
    res.json(json)
  })
})

app.get("/api/user-timeline", (req, res) => { 
  const url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
  const cookies = req.cookies;
  const user_id = cookies.user_id;
  const [oauth_token, oauth_token_secret] = users[user_id]; 

  const twAPI = new TwitterApi(); 
  twAPI.setAuthToken(oauth_token); 
  twAPI.setAuthTokenSecret(oauth_token_secret); 
 
  twAPI.get(url, {user_id})
  .then(response => { 
    const json = JSON.parse(response);
    res.json(json)
  })
})

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
    const json = JSON.parse(response);
    const trendingTweets = json[0].trends.slice(0, 5); 
    res.json(trendingTweets); 
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
    const json = JSON.parse(response);
    res.json(json);  
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
    const json = JSON.parse(response);
    res.json(json); 
  })
})

app.post('/api/profile-update', (req, res) => { 
  const url = "https://api.twitter.com/1.1/account/update_profile.json";
  const {name, description} = req.query;
  const cookies = req.cookies;
  const userId = cookies.user_id;
  const [oauth_token, oauth_token_secret] = users[userId]; 

  const twAPI = new TwitterApi(); 
  twAPI.setAuthToken(oauth_token); 
  twAPI.setAuthTokenSecret(oauth_token_secret); 

  twAPI.post(url, {name, description})
  .then(response => { 
    const json = JSON.parse(response);
    res.json(json); 
  })
})

app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html')); 
})

app.listen(PORT, () => console.log(`Server Listening on ${PORT} `)); 