
//goal order
// "oauth_callback"
// "oauth_consumer_key"
// "oauth_nonce"
// "oauth_signature_method"
// "oauth_timestamp"
// "oauth_version"

const headers = [ 
  "oauth_version", 
  "oauth_consumer_key",
  
  "oauth_signature_method",
  "oauth_timestamp", 
  
  "oauth_callback",
  "oauth_nonce",
]; 

console.log(headers.sort()); 
