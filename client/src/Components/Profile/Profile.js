import {useEffect, useState} from 'react'; 

import NavBar from "../NavBar/NavBar"; 
import TweetSearch from "../TweetSearch/TweetSearch"; 
export default function Profile(props) { 
  const [profileImageUrl, setProfileImageUrl] = useState(''); 
  const [name, setName] = useState(''); 
  const [screenName, setScreenName] = useState(''); 
  const [description, setDescription] = useState('');
  const [dateJoined, setDateJoined] = useState(''); 
  const [followers, setFollowers] = useState(''); 
  const [following, setFollowing] = useState(''); 
  const [profileBannerUrl, setProfileBannerUrl] = useState(''); 
  const { setIsLoggedIn } = props; 


  useEffect(() => { 
    fetch('api/profile-info')
    .then(data => data.json())
    .then(response => { 
      console.log(response)
      setProfileDetails(response)
    })
  }, []);

  function setProfileDetails(response) { 
    setName(response.name); 
    setScreenName(response.screen_name); 
    setDescription(response.description); 
    setDateJoined(response.created_at)
    setFollowers(response.followers_count); 
    setFollowing(response.friends_count); 
    setProfileBannerUrl(response.profile_banner_url); 
    setProfileImageUrl(response.profile_image_url_https); 
  }



  function handleEditProfileClick() { 
    alert('modal pop up'); 

  }



  return(<>
    <NavBar logout={() => setIsLoggedIn(false)}/>
    <h1>Profile</h1>
    <img src={profileBannerUrl} alt="profile-banner"/>
    <img src={profileImageUrl} alt="profile-pic"/> 
    <button onClick={handleEditProfileClick}>Edit profile</button>
    <p><strong>{name}</strong></p>
    <p>{screenName}</p>
    <p>{description}</p>
    <p>{dateJoined}</p>
    <p>Following {following}</p>
    <p>Followers {followers}</p>
    <ul>
      {/*tweets*/}
    </ul>
    <TweetSearch />
   
  </>); 
}