require("dotenv/types").config(); 
const crypto = require('crypto'); 
const percentEncode = require('./percentEncode');

const createTimeStamp = () => `${Math.round(Date.now() / 1000)}`;

const createOAuthOnce = () => { 
  return crypto.randomBytes(32).toString('base64').replace(/\W/g, '');
};


const sortParameters = (parameters) => { 
  return parameters.sort((a, b) => { 
    if (percentEncode(a.key) > percentEncode(b.key)) { 
      return 1;
    }
    if (percentEncode(a.key) < percentEncode(b.key)) { 
      return -1; 
    } 
    return 0; 
  })
}

const createParameterString = (oauthOnce, oauthTimeStamp, parameters) => { 
  const defaultParams = [
    {key:"oauth_consumer_key", value: process.env.OAUTH_CONSUMER_KEY},
    {key:"oauth_timestamp", value: oauthTimeStamp}, 
    {key:"oauth_nonce", value: oauthOnce }, 
    {key:"oauth_version", value: process.env.OAUTH_VERSION }, 
    {key:"oauth_signature_method", value: process.env.OAUTH_SIGNATURE_METHOD},
  ]

  const collectedParameters = defaultParams.concat(parameters); 
  const sorted = sortParameters(collectedParameters)
  const appendEquals = sorted.map(param => { 
    return `${percentEncode(param.key)}=${percentEncode(param.value)}`; 
  })
  
  const appendAmpersand = appendEquals.join("&"); 
  return appendAmpersand; 
};


const createSignatureBaseString = (parameterString, requestUrl, HttpMethod = "POST") => { 
  return `${HttpMethod}&${percentEncode(requestUrl)}&${percentEncode(parameterString)}`;
};


const createSigningKey = (oauthTokenSecret = '') => { 
  return percentEncode(process.env.CONSUMER_SECRET) + '&' + percentEncode(oauthTokenSecret);
};


const createSignature = (singingKey, signatureBaseString) => { 
  const hmac = crypto.createHmac('sha1', singingKey)
  hmac.update(signatureBaseString);
  return hmac.digest('base64');
}

const createAuthorizationHeader = (oauthOnce, timeStamp, signature, params) => { 
  const defaultParams = [
    {key:"oauth_consumer_key", value: process.env.OAUTH_CONSUMER_KEY},
    {key:"oauth_timestamp", value: timeStamp}, 
    {key:"oauth_nonce", value: oauthOnce }, 
    {key:"oauth_version", value: process.env.OAUTH_VERSION }, 
    {key:"oauth_signature_method", value: process.env.OAUTH_SIGNATURE_METHOD},
    {key:"oauth_signature", value: signature}
  ]

  const collectedParameters = defaultParams.concat(params); 

  const sorted = sortParameters(collectedParameters)
  const appendEquals = sorted.map(param => { 
    return `${percentEncode(param.key)}="${percentEncode(param.value)}"`; 
  })

  const appendCommasAndSpaces = appendEquals.join(', '); 
  const fullAuthHeader = "OAuth " + appendCommasAndSpaces; 
  return fullAuthHeader; 
};


const createSignedHeader = (parameters, requestUrl, oauthTokenSecret, HttpMethod) => { 
  const timeStamp = createTimeStamp();
  const oauthOnce = createOAuthOnce();
  const parameterString = createParameterString(oauthOnce, timeStamp, parameters); 
  const signatureBaseString = createSignatureBaseString(parameterString, requestUrl, HttpMethod); 
  const signingKey = createSigningKey(oauthTokenSecret); 
  const signature = createSignature(signingKey, signatureBaseString);
  return createAuthorizationHeader(oauthOnce, timeStamp, signature, parameters); 
};


const parseOAuthParams = (responseString) => { 
  const OAuthParams = {}; 
  
  const params = responseString.split("&");
  params.forEach((param) => { 
    const queryParams = param.split("="); 
    const queryKey = queryParams[0]; 
    const queryValue = queryParams[1]; 
    OAuthParams[queryKey] = queryValue;
  })

  return OAuthParams; 
};

  

module.exports = {
  createOAuthOnce, 
  createSigningKey, 
  createParameterString, 
  createSignatureBaseString, 
  createSignature,
  createAuthorizationHeader, 
  createSignedHeader,  
  parseOAuthParams
 }