
export default function Details({details, onEditButtonClick}) { 

  if (!details) { 
    return <p>Loading...</p>
  }

  return (<>
    <h1>Profile</h1>
    <img src={details.profile_banner_url} alt="profile-banner"/>
    <img src={details.profile_image_url} alt="profile-pic"/> 
    <button onClick={onEditButtonClick}>Edit profile</button>
    <p><strong>{details.name}</strong></p>
    <p>{details.screen_name}</p>
    <p>{details.description}</p>
    <p>{details.created_at}</p>
    <p>Following {details.friends_count}</p>
    <p>Followers {details.followers_count}</p>
    <ul>
      {/*tweets*/}
    </ul>
  </>);
}