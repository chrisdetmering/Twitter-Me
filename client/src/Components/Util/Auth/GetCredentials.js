import { useEffect } from "react"; 
import { useHistory }  from "react-router-dom"; 
import { 
  useLocation
} from "react-router-dom"; 
import Spinner from "../UI/Spinners/LoadingSpinner"; 

export default function GetCredentials(props) { 
  const {login} = props; 
  const location = useLocation(); 
  const history = useHistory(); 
  const params = new URLSearchParams(location.search);
  const oauthToken = params.get('oauth_token'); 
  const oauthVerifier = params.get('oauth_verifier');
 

  useEffect(() => { 
    fetch(`/api/access-token?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`)
    .then(data => data.json())
    .then(response => {
     
      if (response && Object.keys(response).length === 0) { 
        //TODO: refactor this to use throw
        alert('Something went wrong. Do not press the reload putting while on this page')
        console.error(`Response object is empty. This means that the user reloaded the get-credentials page 
        or something went wrong with the signing process`); 
        console.log('response object', response); 
        history.push('/'); 
      }
      //TODO: make this safer
      //Just temporality storing use auth information in local storage until 
      //I can figure out a more secure way of doing it without a DB
      // for (const param in response) { 
      //   localStorage.setItem(param, response[param]); 
      // }
    
    })
    .then(() => { 
      login(true); 
      history.push('/home'); 
    })
    .catch(error => console.log(`Network error: ${error}`)); 
    //TODO: figure out what to do with this
    // eslint-disable-next-line
  }, [oauthToken, oauthVerifier])
  

  return (
    <div style={{
        height: "100vh",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"}}>
      <Spinner klass="large-spinner"/>
    </div>
  );
}