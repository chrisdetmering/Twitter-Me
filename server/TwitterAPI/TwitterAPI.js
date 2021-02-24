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
    this.queryParams = []; 
    this.body = undefined; 
  }
  
  get(baseUrl, queryParams) { 
    this.setBaseUrl(baseUrl);
    this.setQueryParams(queryParams); 
    return this.request("GET"); 
  }

  
  post(baseUrl, queryParams, body) { 
    this.setBaseUrl(baseUrl);
    this.setQueryParams(queryParams); 
    return this.request("POST", body); 
  }

  setBaseUrl(baseUrl) { 
    this.baseUrl = baseUrl; 
  }


  setQueryParams(queryParams) { 
    if (queryParams) { 
      this.queryParams = Object.keys(queryParams).map(key => { 
        const value = queryParams[key]; 
        return {key, value}
      });
    } 
  }


  isQueryParams() { 
    return this.queryParams.length > 0;
  }
  
  createUrl() { 
    if (this.isQueryParams()) { 
      return this.createUrlWithParams(); 
    }
    return this.baseUrl; 
  }

  createUrlWithParams() { 
    const queryString = this.queryParams.map(
      param => `${param.key}=${param.value}`
    ).join('&'); 
    return `${this.baseUrl}?${queryString}`; 
  }


  request(method, body) { 
    const xhr = new XMLHttpRequest(); 
    const url = this.createUrl(); 
    
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", this.getSignedHeader(method));
    
    const promise = new Promise((resolve, reject) => { 
      xhr.addEventListener("load", function() { 
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

    if (this.queryParams) { 
      parameters = this.getParametersWithData(); 
    } else { 
      parameters = this.parameters; 
    }
 
    return createSignedHeader(parameters, this.baseUrl, this.oauth_token_secret, method);
  }


  getParametersWithData() { 
    return [...this.parameters, ...this.queryParams]; 
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