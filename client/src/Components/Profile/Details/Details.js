import "./Details.css"; 
import Button from "../../Util/UI/Buttons/Button"; 
import Spinner from "../../Util/UI/Spinners/LoadingSpinner";

export default function Details({details, onEditButtonClick}) { 

  function getDate(date) { 
    return new Date(date).toLocaleDateString(); 
  }

    
  

  function getOriginalProfileImage() { 
    const parts = details.profile_image_url.split('_'); 
    const last = parts.pop(); 
    const newParts = parts.join('_');  
    const imageType = last.split('.').pop(); 
    return newParts + '.' + imageType; 
  }

  

  if (!details) { 
    return (
      <div className="details-spinner-container">
        <Spinner />
      </div>
     );
  }
 

  const profileImage = getOriginalProfileImage();

  return (<>
    <div className="details-container">
      <img className="banner" src={details.profile_banner_url} alt="profile-banner"/>
      <img className="profile-picture" src={profileImage} alt="profile-pic"/>
      <div className="edit-button-container">
        <Button
          classes="small light"
          click={onEditButtonClick}>Edit profile</Button>
      </div>
      <div className="profile-info-container">
        <h3>{details.name}</h3>
        <p className="screen-name">@{details.screen_name}</p>
        <p className="description">{details.description}</p>
        <p><span className="material-icons icon">
          date_range
          </span> Joined {getDate(details.created_at)}
        </p>
        <div className="count-container">
          <p><span className="count">{details.friends_count}</span><span className="text">Following</span></p>
          <p><span className="count">{details.followers_count}</span><span className="text">Followers</span></p>
        </div>
      </div>
    </div>
  </>);
}