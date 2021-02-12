const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const {createSignedHeader} = require("./twitterOAuthSignature");

function customFetch(method, url, options) { 
  const {
    body, 
    parameters, 
    isUserContextAuth, 
    isBearerAuth,
    oauthTokenSecret
  } = options; 

  if (!method && !url) { 
    throw 'Did not pass in a method or url';
  }


  if (!isUserContextAuth && !isBearerAuth) { 
    throw 'Did not pass in isUserContextAuth or isBearerAuth to options';
  }

  const xhr = new XMLHttpRequest();
  xhr.open(method, url);


  if (isBearerAuth) { 
    xhr.setRequestHeader("Authorization", `Bearer ${process.env.BEARER_TOKEN}`);
  }
  if (isUserContextAuth) { 
    const AuthorizationHeaderString = createSignedHeader(parameters, url, oauthTokenSecret, method);  
  xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Authorization", AuthorizationHeaderString);
  }

  const promise = new Promise((resolve, reject) => {
    xhr.addEventListener("load", function() { 
      //Twitter Api will send back an JSON object with a property errors
      //Not sure why I had to JSON.stringify this in order to 
      //make the /api/access-token endpoint work 
      const response = JSON.stringify(this.responseText)
      if (JSON.parse(response)["errors"]) { 
        
        reject(this.responseText);
      } else { 
        resolve(this.responseText); 
      }
    })
    xhr.addEventListener("error", function() { 
      console.log('error', this.responseText)
      reject(this.responseText); 
    })
  })


  xhr.send(body);
  return promise; 
}

module.exports = customFetch; 