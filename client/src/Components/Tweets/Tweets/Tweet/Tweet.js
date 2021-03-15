import {useEffect, useState} from 'react'; 
import "./Tweet.css"; 

export default function Tweet({ tweet }) { 
  const [profilePicUrl, setProfilePicUrl] = useState(''); 
  const {user} = tweet; 
  const {created_at, text, retweet_count, favorite_count} = tweet; 

  useEffect(() => { 
    fetch(`/api/users/profile-picture?screen_name=${user.screen_name}`)
    .then(data => data.json())
    .then(response => { 

      setProfilePicUrl(response);
    })
    .catch(error => console.error(error))

  }, []); 


  function getHoursSinceTweeted() { 
    const date = new Date(created_at); 
    const hoursSince = Math.floor((Date.now() - date.getTime()) / 3600000); 
 
    if (hoursSince === 0) { 
      return Math.floor((Date.now() - date.getTime()) / 60000) + 'min'; 
    }
    return hoursSince + 'h'; 
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