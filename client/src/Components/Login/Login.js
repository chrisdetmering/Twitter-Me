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
    fetch("/sign-in-with-twitter")
    .then(data => console.log(data.text()))
  }


  return(<>
    <button onClick={handleLoginClick}>Login</button>
    <button onClick={handleTwitterLoginClick}>Sign in with Twitter</button>
  </>); 
}