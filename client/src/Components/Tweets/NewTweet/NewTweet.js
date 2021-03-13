import {useState} from 'react'; 
import './NewTweet.css'; 
import Button from "../../Util/UI/Buttons/Button"; 


export default function NewTweet(props) { 
  const {getTweets, showModal} = props; 
  const [newTweet, setNewTweet] = useState(''); 

    // useEffect(() => { 
    //   fetch(`/api/profile-picture`)
    //   .then(data => data.json())
    //   .then(response => {
    //     setProfileImageUrl(response); 
    //   })
    //   .catch(error => console.error(error))
    // }, [])

  function handleNewTweet() { 
    fetch(`/api/status/update?status=${newTweet}`)
    .then(response => {
      if (response.ok) { 
        getTweets();  
        setNewTweet(''); 
      }
      
    })
    .catch(error => { 
      alert(`There was the following network error ${error}`)
      console.error(error); 
    })
    .finally(() => { 
      if (showModal) { 
        showModal(false); 
      }
    } ); 
  }



  function handleNewTweetChange(e) { 
    e.preventDefault(); 
    const newTweet = e.target.value;
    setNewTweet(newTweet); 
  } 


  return (<>
    <div className="new-tweet-container">
      <textarea 
        className="new-tweet-input"
        maxLength="140"
        placeholder="what's happening?" 
        onChange={handleNewTweetChange} 
        value={newTweet}/>
      <div className="new-tweet-button-container">
        <div className="button-container"> 
          <Button 
            classes="small light"
            click={handleNewTweet}>Tweet</Button>

        </div>
       
      </div>      
    </div>
  </>); 
}