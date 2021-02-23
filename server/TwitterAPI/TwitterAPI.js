const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { 
  createSignedHeader
} = require("./twitterOAuthSignature"); 


class TwitterApi { 
  constructor() { 
    this.baseUrl = undefined;
    this.parameters = [];
    this.oauth_token = undefined;
    this.oauth_token_secret = undefined;
    this.queryParam = undefined; 
    this.body = undefined; 
  }
  
  get(baseUrl, queryParam) { 
    this.setBaseUrl(baseUrl);
    this.setQueryParam(queryParam); 
    return this.request("GET"); 
  }

  
  post(baseUrl, queryParam, body) { 
    this.setBaseUrl(baseUrl);
    this.setQueryParam(queryParam); 
    return this.request("POST", body); 
  }

  setBaseUrl(baseUrl) { 
    this.baseUrl = baseUrl; 
  }

  // setParameters(parameters) { 
  //   this.parameters = [...this.parameters, ...parameters]; 
  // }

  setQueryParam(queryParam) { 
    if (queryParam) { 
      const keys = Object.keys(queryParam); 
      const key = keys[0]; 
      const value = queryParam[key]; 
      this.queryParam = {key, value}
    } else { 
      this.queryParam = null; 
    }
  }

  getBaseUrlWithQueryParams() { 
    return `${this.baseUrl}?${this.queryParam.key}=${this.queryParam.value}`;
  }

  request(method, body) { 
    const xhr = new XMLHttpRequest(); 
    const url = this.queryParam ? this.getBaseUrlWithQueryParams() : this.baseUrl; 
    
    xhr.open(method, url);
    
    const AuthorizationHeader =  this.getSignedHeader(method); 
  
    xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", AuthorizationHeader);
    
    const promise = new Promise((resolve, reject) => { 
      xhr.addEventListener("load", function() { 
       
        // const response = JSON.parse(this.responseText); 
        resolve(this.responseText); 
      })
      xhr.addEventListener("error", function() { 
       
        reject(this.responseText); 
      })

    })
    
  
    xhr.send(body); 
    return promise; 
  }

  getSignedHeader(method) { 
    let parameters; 

    if (this.queryParam) { 
      parameters = this.getParametersWithData(); 
    } else { 
      parameters = this.parameters; 
    }
   
    return createSignedHeader(parameters, this.baseUrl, this.oauth_token_secret, method);
  }


  getParametersWithData() { 
    return [...this.parameters, this.queryParam]; 
  }

  setParameter(key, value) { 
    this.parameters.push({key, value}); 
  }

  setAuthToken(oauthToken) { 
    this.setParameter('oauth_token', oauthToken); 
    this.oauth_token = oauthToken; 
  }

  setAuthTokenSecret(oauthTokenSecret) { 
    this.setParameter('oauth_token_secret', oauthTokenSecret); 
    this.oauth_token_secret = oauthTokenSecret; 
  }
 
} 


module.exports = TwitterApi