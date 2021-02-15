import { useHistory } from "react-router-dom"; 
import React from 'react'; 
export default function Login(props) { 
  const {login} = props; 
  let history = useHistory(); 

  function handleLoginClick() { 
    login(true) 
    history.push("/home")
  }

  function handleTwitterLoginClick() { 
    fetch("/api/sign-in-with-twitter")
    .then(data => {
      console.log(data)
      return data.text()
     })
    .then(response => { 
      console.log(response)
      window.location = response; 
    }); 
  }


  return(<>
    <button onClick={handleLoginClick}>Login</button>
    <button onClick={handleTwitterLoginClick}>Sign in with Twitter</button>
  </>); 
}