import {useEffect, useState} from 'react'; 

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
        setLocalTrendingTweets(response[0].trends); 
      }
    })
    .catch(error => console.error(error))
  }, [])


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
      setSearchedTweets(response.statuses);
      setSearchTerm('');
     })
    .catch(error => console.log(error))
  }



//TODO: need to think of a better way of doing this
  function displayTweets() { 
    if (isSearched) { 
      return searchedTweets.map(tweet => (
        <li key={tweet.id}>{tweet.text}</li>
      ))
    }

    return localTrendingTweets.map((trend, idx) => (
      <li key={idx}>{trend.name}</li>
    ))
  }


  return (<>
    <br/>
    <input 
      type="text" 
      placeholder="search twitter..."
      onChange={handleSearchChange} 
      value={searchTerm}/>
    <button onClick={handleSearchButtonClick}>Search</button>
    <ul>
      {displayTweets()}
    </ul>
  </>)
}