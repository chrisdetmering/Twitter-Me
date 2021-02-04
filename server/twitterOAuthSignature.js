require("dotenv").config(); 
const crypto = require('crypto'); 
const percentEncode = require('./percentEncode');

// createTimeStamp
//The oauth_timestamp parameter indicates when the request was created.
// This value should be the number of seconds since the Unix epoch at the point 
// the request is generated, and should be easily generated in most programming 
// languages. 

const createTimeStamp = () => `${Math.round(Date.now() / 1000)}`;

// createOAuthOnce
// The oauth_nonce parameter is a unique token your application should generate
// for each unique request. Twitter will use this value to determine whether 
// a request has been submitted multiple times. 
// The value for this request was generated by base64 
// encoding 32 bytes of random data, and stripping out all non-word characters,

const createOAuthOnce = () => { 
  return crypto.randomBytes(32).toString('base64').replace(/\W/g, '');
};

// createParameterString 
// 1) Percent encode every key and value that will be signed.
// 2) Sort the list of parameters alphabetically [1] by encoded key [2].
// 3) For each key/value pair:
// 4) Append the encoded key to the output string.
// 5) Append the ‘=’ character to the output string.
// 6) Append the encoded value to the output string.
// 7) If there are more key/value pairs remaining, append a ‘&’ character to the output string.

const createParameterString = (oauthOnce, oauthTimeStamp) => { 
  return percentEncode("oauth_callback") + "=" +
  percentEncode(process.env.OAUTH_CALLBACK) + '&' +
  percentEncode("oauth_consumer_key") + '=' +
  percentEncode(process.env.OAUTH_CONSUMER_KEY) + '&' + 
  percentEncode("oauth_nonce") + '=' + 
  percentEncode(oauthOnce) + '&' + 
  percentEncode("oauth_signature_method")  + '=' + 
  percentEncode(process.env.OAUTH_SIGNATURE_METHOD) + '&' +
  percentEncode("oauth_timestamp") + "=" + 
  percentEncode(oauthTimeStamp) + "&" +  
  percentEncode("oauth_version") + "=" + 
  percentEncode(process.env.OAUTH_VERSION);
};

//createSignaturebaseString
// The three values collected so far must be joined to make a single string,
// from which the signature will be generated.
// This is called the signature base string 
//(this is what getSignatureBaseString returns)
// by the OAuth specification.

// To encode the HTTP method, base URL, and parameter string into a single string:
// 1) Convert the HTTP Method to uppercase and set the output string equal to this value.
// 2) Append the ‘&’ character to the output string.
// 3) Percent encode the URL and append it to the output string.
// 4) Append the ‘&’ character to the output string.
// 5) Percent encode the parameter string and append it to the output string.

const createSignatureBaseString = (parameterString) => { 
  return "POST" + "&" + 
  percentEncode("https://api.twitter.com/oauth/request_token") + "&" + 
  percentEncode(parameterString);
};

// createSigningKey
// the signing key should consist of the 
// percent encoded consumer secret followed by an ampersand character ‘&’.

const createSigningKey = () => { 
  return percentEncode(process.env.CONSUMER_SECRET) + '&';
};

// createSignature
// Finally, the signature is calculated by passing the signature base string
// and signing key to the HMAC-SHA1 hashing algorithm. 
// The details of the algorithm are explained as hash_hmac function.
// The output of the HMAC signing function is a binary string. 
// This needs to be base64 encoded to produce the signature string. 
// For example, the output given the base string and signing key given on this page
// is 84 2B 52 99 88 7E 88 7602 12 A0 56 AC 4E C2 EE 16 26 B5 49. 
// That value, when converted to base64, is the OAuth signature for this request:

const createSignature = (singingKey, signatureBaseString) => { 
  const hmac = crypto.createHmac('sha1', singingKey)
  hmac.update(signatureBaseString);
  return hmac.digest('base64');
}

// createAuthorizationHeader
// To build the header string, imagine writing to a string named DST.
// Append the string “OAuth ” (including the space at the end) to DST.
// For each key/value pair of the 7 parameters listed above:
// Percent encode the key and append it to DST.
// Append the equals character ‘=’ to DST.
// Append a double quote ‘”’ to DST.
// Percent encode the value and append it to DST.
// Append a double quote ‘”’ to DST.
// If there are key/value pairs remaining, append a comma ‘,’ and a space ‘ ‘ to DST.

const createAuthorizationHeader = (oauthOnce, timeStamp, signature) => { 
  return "OAuth " +
  percentEncode("oauth_callback") + "=" + 
  `"${percentEncode(process.env.OAUTH_CALLBACK)}"` + ', ' +
  percentEncode("oauth_consumer_key") + '=' + 
  `"${percentEncode(process.env.OAUTH_CONSUMER_KEY)}"` + ', ' + 
  percentEncode("oauth_nonce") + '=' + 
  `"${percentEncode(oauthOnce)}"` + ', ' + 
  percentEncode("oauth_signature") + '=' + 
  `"${percentEncode(signature)}"` + ', ' + 
  percentEncode("oauth_signature_method") + '=' + 
  `"${percentEncode(process.env.OAUTH_SIGNATURE_METHOD)}"` + ', ' + 
  percentEncode("oauth_timestamp") + '=' + 
  `"${percentEncode(timeStamp)}"` + ', ' + 
  percentEncode("oauth_version") + '=' + 
  `"${percentEncode(process.env.OAUTH_VERSION)}"`
};

const createAuthorizationHeaderV2 = (oauthOnce, timeStamp, )


//This does all the work for you of creating a signed header for Twitter
const createSignedHeader = () => { 
  const timeStamp = createTimeStamp(); 
  const oauthOnce = createOAuthOnce();  
  const parameterString = createParameterString(oauthOnce, timeStamp); 
  const signingKey = createSigningKey(); 
  const signatureBaseString = createSignatureBaseString(parameterString); 
  const signature = createSignature(signingKey, signatureBaseString);
  return createAuthorizationHeader(oauthOnce, timeStamp, signature); 
};





//Util function 

const parseOAuthToken = (responseString) => { 
  return responseString.split("&")[0].split("=")[1];
};



module.exports = {
  createOAuthOnce, 
  createSigningKey, 
  createParameterString, 
  createSignatureBaseString, 
  createSignature,
  createAuthorizationHeader, 
  createSignedHeader, 
  parseOAuthToken
 }