import {useState} from 'react'; 
import './NewTweet.css'; 

export default function NewTweet(props) { 
  const {getTweets, showModal} = props; 
  const [newTweet, setNewTweet] = useState(''); 


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
    .finally(() => showModal(false)); 
  }



  function handleNewTweetChange(e) { 
    e.preventDefault(); 
    const newTweet = e.target.value;
    setNewTweet(newTweet); 
  } 


  return (<>
    <input placeholder="what's happening?" onChange={handleNewTweetChange} value={newTweet}/>
    <button onClick={handleNewTweet}>Tweet</button>
  </>); 
}