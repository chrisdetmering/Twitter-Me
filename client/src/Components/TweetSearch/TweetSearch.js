import {useEffect, useState} from 'react'; 
import "./TweetSearch.css"; 
import TrendingTweetsList from "../Tweets/TendingTweet/TrendingTweetsList/TrendingTweetsList";  

export default function TweetSearch(props) { 
  const [localTrendingTweets, setLocalTrendingTweets] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [isLoading, setIsLoading] = useState(true); 
  const {setTweets, setLoading} = props; 

  useEffect(() => { 
    fetch(`/api/trends`)
    .then(data => data.json())
    .then(response => { 
      if (response.length > 0) {
        setLocalTrendingTweets(response); 
        setIsLoading(false); 
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
    setLoading(true);
    e.preventDefault(); 
    fetch(`/api/search?q=${searchTerm}`)
    .then(data => data.json())
    .then(response => { 
      setTweets(response.statuses);
      setLoading(false);
      setSearchTerm('');
     })
    .catch(error => console.log(error))
  }


  function handleTrendingTweetClick(searchTerm) { 
    setLoading(true);
    fetch(`/api/search?q=${searchTerm}`)
    .then(data => data.json())
    .then(response => { 
      setTweets(response.statuses);
      setLoading(false);
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
        loading={isLoading}
        tweets={localTrendingTweets}
        search={handleTrendingTweetClick}/>
      
    </div>
  </>)
}