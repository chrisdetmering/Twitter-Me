import {useEffect, useState} from 'react'; 

import NavBar from "../NavBar/NavBar"; 
import TweetSearch from "../TweetSearch/TweetSearch"; 
export default function Profile(props) { 
  const [profileImageUrl, setProfileImageUrl] = useState(''); 
  const { setIsLoggedIn } = props; 

  useEffect(() => { 
    fetch(`/api/profile-picture`)
    .then(data => data.json())
    .then(response => {
      setProfileImageUrl(response); 
    })
    .catch(error => console.error(error))
  }, []);

  useEffect(() => { 
    fetch('api/profile-info')
    .then(data => console.log(data))
    
  }, []);


  function handleEditProfileClick() { 
    alert('modal pop up'); 

  }



  return(<>
    <NavBar logout={() => setIsLoggedIn(false)}/>
    <h1>Profile</h1>
    <p>Banner</p>
    <img src={profileImageUrl} alt="profile-pic"/> 
    <button onClick={handleEditProfileClick}>Edit profile</button>
    <p><strong>Name</strong></p>
    <p>Tweet Handler</p>
    <p>Bio</p>
    <p>Date Joined</p>
    <p>Following</p>
    <p>Followers</p>
    <ul>
      {/*tweets*/}
    </ul>
    <TweetSearch />
   
  </>); 
}