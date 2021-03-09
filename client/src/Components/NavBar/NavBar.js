import {useState} from "react"; 
import { NavLink} from "react-router-dom";
import Modal from "../Util/UI/Modals/Modal"; 
import NewTweet from "../Tweets/NewTweet/NewTweet"; 
import "./NavBar.css"; 


export default function NavBar(props) { 
  const {getTweets} = props; 
  const [showModal, setShowModal] = useState(false); 

  function handleTweetButtonClick() { 
    setShowModal(true); 
  }

  function handleCloseModalClick(event) { 
    const isBackDropClicked = event.target.id === "modal-backdrop"; 
    const isCloseButtonClicked = event.target.id === "modal-close-button"; 

    if (isBackDropClicked || isCloseButtonClicked) { 
      setShowModal(false); 
    }
  }

  return(<>
    <Modal show={showModal} close={handleCloseModalClick}>
      <NewTweet getTweets={getTweets} showModal={setShowModal}/>
    </Modal>
    <ul>
      <li>
        <NavLink to="/home" activeClassName="active">home</NavLink>
      </li>
      <li>
        <NavLink to="/profile" activeClassName="active">profile</NavLink>
      </li>
      <li>
        <button onClick={handleTweetButtonClick}>Tweet</button>
      </li>
      <li>
        <button onClick={props.logout}>Logout</button>
      </li>
    </ul>
  </>); 

}