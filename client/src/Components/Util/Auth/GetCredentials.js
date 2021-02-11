import { useEffect } from "react"; 
import { useHistory }  from "react-router-dom"; 
import { 
  useLocation
} from "react-router-dom"; 

export default function GetCredentials(props) { 
  const location = useLocation(); 
  const history = useHistory(); 
  const params = new URLSearchParams(location.search);
  const oauthToken = params.get('oauth_token'); 
  const oauthVerifier = params.get('oauth_verifier');
 

  useEffect(() => { 
    fetch(`/api/access-token?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`)
    .then(data => data.json())
    .then(response => {
      //TODO: figure out where to save oauth_token_secret & oauth_token 
      console.log(response); 
      // response.forEach(oauthParams => {
      //   localStorage.setItem(oauthParams.key, oauthParams.value)
      // });
      // props.login(true); 
      // history.push('/home'); 
    })
    .catch(error => console.log(`Network error: ${error}`)); 
  }, [oauthToken, oauthVerifier])
  

  return (<h1>Loading your profile...</h1>);


}