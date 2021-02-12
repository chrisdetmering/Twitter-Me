import {useState, useEffect} from "react"; 
import NavBar from "../NavBar/NavBar"; 
export default function Home(props) { 
  const [profileImageUrl, setProfileImageUrl] = useState(''); 
  const [homeTimelineTweets, setHomeTimelineTweets] = useState([]); 
  const [localTrendingTweets, setLocalTrendingTweets] = useState([]); 
  const {setIsLoggedIn} = props; 
  
  useEffect(() => { 
    fetch(`/api/profile-picture`)
    .then(data => data.json())
    .then(response => {
      setProfileImageUrl(response); 
    })
    .catch(error => console.error(error))
  }, [])

  useEffect(() => { 
    fetch(`/api/home-timeline`)
    .then(data => data.json())
    .then(response => { 
      if (response) { 
        setHomeTimelineTweets(response); 
      }
    })
    .catch(error => console.error(error))
  }, [])


  // useEffect(() => { 
  //   fetch(`/api/trends`)
  //   .then(data => data.json())
  //   .then(response => { 
  //     if (response) { 
  //       setHomeTimelineTweets(response); 
  //     }
  //   })
  //   .catch(error => console.error(error))
  // }, [])


  return(<>
    <NavBar logout={() => setIsLoggedIn(false)}/>
    
    
    {/*TweetCard*/}
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


    {/* SearchBar*/}
    <br/>
    <input type="text" placeholder="search twitter..."/>
    {/*What's Happing local trends*/}
    {/*TODO: get local trends using:}
    {/*1. /trends/available endpoint */}
    {/*2. /trends/location* endpoint */}
    <ul>

    </ul>
  </>); 
}