import {useState, useEffect} from "react"; 
import NavBar from "../NavBar/NavBar"; 
export default function Home(props) { 
  const initialIdState = () => localStorage.getItem("user_id"); 
  const [userId] = useState(initialIdState); 
  const [profileImageUrl, setProfileImageUrl] = useState(''); 
  const [homeTimelineTweets, setHomeTimelineTweets] = useState([]); 
  const {setLoggedIn} = props; 
  
  useEffect(() => { 
    fetch(`/api/profile-picture?user_id=${userId}`)
    .then(data => data.json())
    .then(response => {
      setProfileImageUrl(response); 
    })
  }, [])

  useEffect(() => { 
    fetch(`/api/home-timeline?oauth_token=${localStorage.getItem('oauth_token')}&oauth_token_secret=${localStorage.getItem('oauth_token_secret')}`)
    .then(data => data.json())
    .then(response => { 
      if (response) { 
        setHomeTimelineTweets(response); 
      }
    })
    .catch(error => console.error(error))
  }, [])


  return(<>
    <NavBar logout={() => setLoggedIn(false)}/>
    
    
    {/*Tweet Card*/}
    <h1>Home</h1>
    <img src={profileImageUrl} alt="profile-pic"/> 
    <p>What's Happening?</p>
    <button>Tweet</button>


    {/*Timeline */}
    <ul>
      {homeTimelineTweets.map(tweet => (
        <li key={tweet.id}>{tweet.text}</li>
      ))}
    </ul>


    {/* Search bar*/}
    <br/>
    <input type="text" placeholder="search twitter..."/>
    
  </>); 
}