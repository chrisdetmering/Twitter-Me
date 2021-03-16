import {useEffect, useState} from 'react'; 
import "./Tweet.css"; 
import Spinner from "../../../Util/UI/Spinners/LoadingSpinner";
import ErrorMessage from "../../../Util/UI/Errors/ErrorMessage";

export default function Tweet({ tweet }) { 
  const [profilePicUrl, setProfilePicUrl] = useState(''); 
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false); 
  const {user} = tweet; 
  const {created_at, text, retweet_count, favorite_count} = tweet; 

  useEffect(() => { 
    setIsLoading(true);
    fetch(`/api/users/profile-picture?screen_name=${user.screen_name}`)
    .then(data => data.json())
    .then(response => { 
      setIsLoading(false); 
      setProfilePicUrl(response);
    })
    .catch(error => { 
      setIsLoading(false); 
      setIsError(true); 
    })

  }, [user.screen_name]); 


  function getHoursSinceTweeted() { 
    const date = new Date(created_at); 
    const hoursSince = Math.floor((Date.now() - date.getTime()) / 3600000); 
    if (hoursSince === 0) { 
      return Math.floor((Date.now() - date.getTime()) / 60000) + 'min'; 
    }
    return hoursSince + 'h'; 
  }

  if (isLoading) return <Spinner />

  if (isError) { 
    return (
      <ErrorMessage 
      messageOne={`You have used this endpoint too much :(.`}
      messageTwo={`Logout and come back in 10 minutes`}
      />
    );
  }

  return (
    <li className="tweet-container">
      <div className="user-profile-image">
        <img 
          src={profilePicUrl} 
          alt=""
          className="profile-image"/>
      </div>
      <div className="tweet-content">
        <p className="user-name">{user.name} 
          <span className="user-user_name">@{user.screen_name} {getHoursSinceTweeted()}</span></p>
        <p>{text}</p>

        <div className="tweet-info">
          <p className="retweets-container">
            <span className="material-icons icon retweets">
              repeat
            </span>
            {retweet_count}
          </p>
          <p className="likes-container">
            <span className="material-icons icon likes">
              favorite_border
            </span>
            {favorite_count}
          </p>
        </div>
      </div>
    </li>
  ); 
}