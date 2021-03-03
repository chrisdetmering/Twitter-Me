import {useState, useEffect} from "react"; 
import NavBar from "../NavBar/NavBar"; 
import TweetSearch from '../TweetSearch/TweetSearch'; 
import NewTweet from "../Tweets/NewTweet/NewTweet"; 

export default function Home(props) { 
  const [profileImageUrl, setProfileImageUrl] = useState(''); 
  const [homeTimelineTweets, setHomeTimelineTweets] = useState([]); 
  const {setIsLoggedIn} = props; 
  
  // useEffect(() => { 
  //   fetch(`/api/profile-picture`)
  //   .then(data => data.json())
  //   .then(response => {
  //     setProfileImageUrl(response); 
  //   })
  //   .catch(error => console.error(error))
  // }, [])

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
    .catch(error => { 
      alert(`There was the following network error ${error}`)
      console.error(error); 
    })
  }



  return(<>
    <NavBar 
      logout={() => setIsLoggedIn(false)}
      getTimelineTweets={getTimelineTweets}
    />
    {/*TweetCard*/}
    <h1>Home</h1>
    {/* <img src={profileImageUrl} alt="profile-pic"/>  */}
    {/* <NewTweet getTweets={getTimelineTweets}/> */}

    {/*Timeline */}
    <ul>
      {homeTimelineTweets.map(tweet => (
        <li key={tweet.id}>{tweet.text}</li>
      ))}
    </ul>

    <TweetSearch />
  </>); 
}