import {useEffect} from "react"; 

import { 
  useLocation
} from "react-router-dom"; 

export default function GettingCredentials(props) { 
  const location = useLocation(); 
  const params = new URLSearchParams(location.search);
  const oauthToken = params.get('oauth_token'); 
  const oauthVerifier = params.get('oauth_verifier');
 
  useEffect(() => { 
    fetch(`/api/access-token?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`)
    .then(data => console.log(data.text())); 
  }, [oauthToken, oauthVerifier])
  

  return (<h1>Loading your profile...</h1>);


}