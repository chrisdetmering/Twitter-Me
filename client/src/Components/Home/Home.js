import {useState, useEffect} from "react"; 
import "./Home.css"; 
import NavBar from "../NavBar/NavBar"; 
import TweetSearch from '../TweetSearch/TweetSearch'; 
import NewTweet from "../Tweets/NewTweet/NewTweet"; 
import TweetList from "../Tweets/Tweets/TweetList/TweetList"; 
import Spinner from "../Util/UI/Spinners/LoadingSpinner"; 
import ErrorMessage from "../Util/UI/Errors/ErrorMessage"; 

export default function Home(props) { 
  const [homeTimelineTweets, setHomeTimelineTweets] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [isError, setIsError] = useState(false); 
  const {setIsLoggedIn} = props; 


  
  useEffect(() => { 
    getTimelineTweets(); 
  }, [])


  function getTimelineTweets() { 
    setIsLoading(true); 
    fetch(`/api/home-timeline`)
    .then(data => data.json())
    .then(response => { 
      
      if (response.errors) { 
        alert(`There was the following error ${response.errors[0].message}`)
        console.error(response.errors[0].message); 
        setIsError(true);
      } else { 
        setHomeTimelineTweets(response); 
      }

    })
    .catch(error => { 
      alert(`There was the following network error ${error}`)
      setIsError(true);
      console.error(error); 
    })
    .finally(() => { 
      setIsLoading(false); 
    })
  }

  if (isError) { 
    return ( 
      <ErrorMessage 
        messageOne="Something went wrong :("/>
    );
  }

  return(<>
    <div className="home-container">
      <div className="home-side-nav-container">
        <NavBar 
          logout={() => setIsLoggedIn(false)}
          getTimelineTweets={getTimelineTweets}
        />
      </div>
      
      <div className="home-header-container">
        <h1 className="home-header">Home</h1>
        <NewTweet 
          getTweets={getTimelineTweets}/>
         {isLoading 
          ? <Spinner /> 
          : <TweetList 
            tweets={homeTimelineTweets}/>}  
      </div>  
      <div className="home-search-container">
        <TweetSearch 
          setTweets={setHomeTimelineTweets}
          setLoading={setIsLoading}/>
      </div>
    </div>
  </>); 
}