import {useState, useEffect} from "react"; 
import "./Home.css"; 
import NavBar from "../NavBar/NavBar"; 
import TweetSearch from '../TweetSearch/TweetSearch'; 
import NewTweet from "../Tweets/NewTweet/NewTweet"; 
import TweetList from "../Tweets/Tweets/TweetList/TweetList"; 
import Spinner from "../Util/UI/Spinners/LoadingSpinner"; 

export default function Home(props) { 
  const [homeTimelineTweets, setHomeTimelineTweets] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const {setIsLoggedIn} = props; 


  
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
        // console.log(response); 
        setHomeTimelineTweets(response); 
        setIsLoading(false); 
      }
    })
    .catch(error => { 
      alert(`There was the following network error ${error}`)
      console.error(error); 
    })
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
        <NewTweet getTweets={getTimelineTweets}/>
         {isLoading 
          ? <Spinner /> 
          : <TweetList tweets={homeTimelineTweets}/>}  
      </div>  
      <div className="home-search-container">
        <TweetSearch setTweets={setHomeTimelineTweets}/>
      </div>
    </div>
  </>); 
}