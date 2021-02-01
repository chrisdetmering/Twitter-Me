import { useHistory } from "react-router-dom"; 
import React from 'react'; 
export default function Login(props) { 
  const {login} = props; 
  let history = useHistory(); 

  function handleClick() { 
    login(true) 
    history.push("/home")
  }

  return(<>
    <button onClick={handleClick}>Login</button>
  </>); 
}