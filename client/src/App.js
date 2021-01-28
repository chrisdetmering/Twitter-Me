import {useState} from 'react'; 
import './App.css';

function App() {
  const [tweet, setTweet] = useState(''); 

 
  function getTweet() { 
    fetch('/tweet')
    .then(response => response.text())
    .then(data => setTweet(data))
  }


  return (<>
    <h1>Twitter</h1>
    <button onClick={getTweet}>Get Tweet</button>
    <p>{tweet}</p>
  </>);
}

export default App;
