const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { 
  createSignedHeader
} = require("../twitterOAuthSignature"); 


class TwitterApi { 
  constructor() { 
    this.baseUrl = null;
    this.parameters = [
      {key:"oauth_consumer_key", value: process.env.OAUTH_CONSUMER_KEY}
    ];
    this.oauth_token = null;
    this.oauth_token_secret = null;
  }
  
  setBaseUrl(baseUrl) { 
    this.baseUrl = baseUrl; 
  }

  setParameters(parameters) { 
    this.parameters = [...this.parameters, ...parameters]; 
  }

  setParameter(key, value) { 
    this.parameters.push({key, value}); 
  }

  setAuthToken(oauthToken) { 
    this.setParameter('oauth_token', oauthToken); 
    this.oauth_token = oauthToken; 
  }
  setAuthTokenSecret(oauthTokenSecret) { 
    this.oauth_token_secret = oauthTokenSecret; 
  }

  
 request(method, url, body) { 
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
    
  
    xhr.send(body); 
    return promise; 
  }

  buildUrl(queryParams) { 

  }

  //get 
  get(url, queryParams) { 
    //STOPPED HERE
    this.baseUrl = url; 
    let urlWithQueryParams = this.baseUrl + '?'; 

    const keys = Object.keys(queryParams); 
    const value = queryParams[keys[0]]; 
    this.setParameter(keys[0], value); 
    urlWithQueryParams = urlWithQueryParams + keys[0] + '=' + value; 
   
    return this.request("GET", urlWithQueryParams); 
  }

  //post
  post(endpoint, body) { 

  }
} 


module.exports = TwitterApi