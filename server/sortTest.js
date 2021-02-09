const percentEncode = require("./percentEncode"); 
//goal order
// "oauth_callback"
// "oauth_consumer_key"
// "oauth_nonce"
// "oauth_signature_method"
// "oauth_timestamp"
// "oauth_version"

const headers = [ { key:"oauth_version", value:"" } ,
  {key:"oauth_consumer_key", value:""},
  
  {key:"oauth_signature_method", value:""},
  {key:"oauth_timestamp", value:""},
  
  {key:"oauth_callback", value:""},
  {key:"oauth_nonce", value:"" }]; 

const sorted = headers.sort((a, b) => { 
  console.log()
  if (percentEncode(a.key) > percentEncode(b.key)) { 
    return 1;
  }
  if (percentEncode(a.key) < percentEncode(b.key)) { 
    return -1; 
  } 
  return 0; 

} ); 

console.log(sorted); 
