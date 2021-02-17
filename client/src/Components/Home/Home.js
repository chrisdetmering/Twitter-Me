import {useState, useEffect} from "react"; 
import NavBar from "../NavBar/NavBar"; 
export default function Home(props) { 
  const [profileImageUrl, setProfileImageUrl] = useState(''); 
  const [homeTimelineTweets, setHomeTimelineTweets] = useState([]); 
  const [localTrendingTweets, setLocalTrendingTweets] = useState([]); 
  const [searchedTweets, setSearchedTweets] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [newTweet, setNewTweet] = useState(''); 
  const [isSearched, setIsSearched] = useState(false); 
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

  useEffect(() => { 
    fetch(`/api/trends`)
    .then(data => data.json())
    .then(response => { 
      if (response.length > 0) { 
        console.log(response[0].trends);
        setLocalTrendingTweets(response[0].trends); 
      }
    })
    .catch(error => console.error(error))
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

  function handleSearchChange(e) { 
    e.preventDefault(); 
    const searchTerm = e.target.value; 
    setSearchTerm(searchTerm); 
  }

  function handleSearchButtonClick() { 
    fetch(`/api/search?q=${searchTerm}`)
    .then(data => data.json())
    .then(response => { 
      setIsSearched(true); 
      setSearchedTweets(response.statuses)

    } )
    .catch(error => console.log(error))
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



  function displayTweets() { 
    if (isSearched) { 
      return searchedTweets.map(tweet => (
        <li key={tweet.id}>{tweet.text}</li>
      ))
    }

    return localTrendingTweets.map(trend => (
      <li key={trend.name}>{trend.name}</li>
    ))
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


    {/* SearchBar*/}
    <br/>
    <input type="text" placeholder="search twitter..." onChange={handleSearchChange}/>
    <button onClick={handleSearchButtonClick}>Search</button>
    <ul>
      {displayTweets()}
    </ul>
    
  </>); 
}