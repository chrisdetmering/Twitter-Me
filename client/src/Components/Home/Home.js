import {useState, useEffect} from "react"; 
import NavBar from "../NavBar/NavBar"; 
import TweetSearch from '../TweetSearch/TweetSearch'; 

export default function Home(props) { 
  const [profileImageUrl, setProfileImageUrl] = useState(''); 
  const [homeTimelineTweets, setHomeTimelineTweets] = useState([]); 
  const [newTweet, setNewTweet] = useState(''); 
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
    getTimelineTweets(); 
  }, [])


  function getTimelineTweets() { 
    fetch(`/api/home-timeline`)
    .then(data => data.json())
    .then(response => { 
      
      if (response.errors) { 
        alert(response.errors[0].message);
        console.error(response.errors[0].message); 
        return; 
      }

      if (response) { 
        setHomeTimelineTweets(response); 
      }
    })
    .catch(error => console.error(error))
  }


  function handleNewTweetChange(e) { 
    e.preventDefault(); 
    const newTweet = e.target.value;
    setNewTweet(newTweet); 
  } 


  function handleNewTweet() { 
    fetch(`/api/status/update?status=${newTweet}`)
    .then(response => {
      if (response.ok) { 
        getTimelineTweets();  
        setNewTweet(''); 
      }
      
    })
    .catch(error => console.error(error))
  }

  return(<>
    <NavBar logout={() => setIsLoggedIn(false)}/>
    {/*TweetCard*/}
    <h1>Home</h1>
    <img src={profileImageUrl} alt="profile-pic"/> 
    <input placeholder="what's happening?" onChange={handleNewTweetChange} value={newTweet}/>
    <button onClick={handleNewTweet}>Tweet</button>


    {/*Timeline */}
    <ul>
      {homeTimelineTweets.map(tweet => (
        <li key={tweet.id}>{tweet.text}</li>
      ))}
    </ul>

    <TweetSearch />
  </>); 
}