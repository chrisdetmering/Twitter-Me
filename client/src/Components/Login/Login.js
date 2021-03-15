import React from 'react'; 
import "./Login.css"; 
import Button from "../Util/UI/Buttons/Button";
import LogoWhite from "../../images/TwitterLogoWhite.png"; 
import LogoBlue from "../../images/TwitterLogoBlue.png"; 

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

  function handleSignUpButtonClick() { 
    window.open("https://mobile.twitter.com/i/flow/signup");
  }

  return(<>
    <img 
      src={LogoWhite}
      alt=""
      className="twitter-logo-main"/> 
    <div className="login-container">
      <div className="twitter-login-image-container">
        <img src={"https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"} 
        alt=""
        className="twitter-login-image"
        />
      </div>
      <div className="twitter-login-welcome">
          <div className="login">
            <img 
              src={LogoBlue} 
              alt=""
              className="twitter-logo-small"/>
            <h1 className="twitter-login-header">Happening Now</h1>
            <h4>Join Twitter Today.</h4>
            <p className="sign-up-notice">*You will be taken to the actual Twitter website to make your 
              account. You will then have to navigate back to this site 
              to sign in with Twitter.*</p>
              <Button 
                classes={"large dark"}
                click={handleSignUpButtonClick}>
                Sign Up
              </Button>
              <Button
                classes={"large light"}
                click={handleTwitterLoginClick}>
                Sign in with Twitter
              </Button>
          </div>
      </div>
    </div>
  </>); 
}