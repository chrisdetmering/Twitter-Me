import {useEffect, useState} from 'react'; 
import TweetList from "../Tweets/Tweets/TweetList/TweetList"; 
import TrendingTweetsList from "../Tweets/TendingTweet/TrendingTweetsList/TrendingTweetsList"; 
import "./TweetSearch.css"; 

export default function TweetSearch(props) { 
  const [localTrendingTweets, setLocalTrendingTweets] = useState([]); 
  const [searchedTweets, setSearchedTweets] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [isSearched, setIsSearched] = useState(false); 


  useEffect(() => { 
    fetch(`/api/trends`)
    .then(data => data.json())
    .then(response => { 
      if (response.length > 0) { 
        // console.log(response); 
        setLocalTrendingTweets(response); 
      }
    })
    .catch(error => console.error(error))
  }, [])


  function handleSearchChange(e) { 
    e.preventDefault(); 
    const searchTerm = e.target.value; 
    setSearchTerm(searchTerm); 
  }

  function handleSearchButtonClick(e) { 
    e.preventDefault(); 
    fetch(`/api/search?q=${searchTerm}`)
    .then(data => data.json())
    .then(response => { 
      setIsSearched(true); 
      setSearchedTweets(response.statuses);
      setSearchTerm('');
     })
    .catch(error => console.log(error))
  }


  function handleTrendingTweetClick(searchTerm) { 
    fetch(`/api/search?q=${searchTerm}`)
    .then(data => data.json())
    .then(response => { 
      setIsSearched(true); 
      setSearchedTweets(response.statuses);
      setSearchTerm('');
     })
    .catch(error => console.log(error))
  }


  return (<>
    <div className="search-container">
      <div className="search-input-container">
        <form 
          className="search-input-form"
          onSubmit={handleSearchButtonClick}>
          <span className="material-icons search-icon">
            search
          </span>
          <input 
            type="text" 
            className="search-input"
            placeholder="Search Twitter"
            onChange={handleSearchChange} 
            value={searchTerm}/>
        </form>
      </div>
      <TrendingTweetsList 
          tweets={localTrendingTweets}
          search={handleTrendingTweetClick}/>
    </div>
  </>)
}