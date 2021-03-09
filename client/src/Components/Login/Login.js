import React from 'react'; 
import "./Login.css"; 
import LogoWhite from "./TwitterLogoWhite.png"; 
import LogoBlue from "./TwitterLogoBlue.png"; 

export default function Login() { 
  function handleTwitterLoginClick() { 
    fetch("/api/sign-in-with-twitter")
    .then(data => {
      return data.text()
     })
    .then(response => { 
      window.location = response; 
    }); 
  }


  return(<>
    <img src={LogoWhite} className="twitter-logo-main"/> 
    <div className="login-container">
      <div className="twitter-login-image-container">
        <img src={"https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"} 
        className="twitter-login-image"/>
      </div>
      <div className="twitter-login-welcome">
          <div className="login">
            <img src={LogoBlue} className="twitter-logo-small"/>
            <h1 className="twitter-login-header">Happening Now</h1>
            <h4>Join Twitter Today.</h4>
            <button className="sign-up-button">Sign Up</button>
            <button className="login-button" onClick={handleTwitterLoginClick}>Sign in with Twitter</button>

          </div>
      </div>
    </div>
  </>); 
}