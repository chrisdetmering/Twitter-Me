import {useState} from "react"; 
import {Link, NavLink} from "react-router-dom";
import "./NavBar.css"; 
import Modal from "../Util/UI/Modals/Modal"; 
import Button from "../Util/UI/Buttons/Button"; 
import NewTweet from "../Tweets/NewTweet/NewTweet"; 
import TwitterLogoBlue from "../../images/TwitterLogoBlue.png"; 


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
    <Modal 
      classes="medium"
      show={showModal} close={handleCloseModalClick}>
      <NewTweet getTweets={getTweets} showModal={setShowModal}/>
    </Modal>
    <ul className="nav-bar-items">
      <li className="nav-bar-item logo-container">
        <Link to="/home">
        <img 
          src={TwitterLogoBlue}
          className="logo"/>
        </Link>
      </li>
      <li className="nav-bar-item">
        <NavLink 
          to="/home" 
          activeClassName="active"
          className="link">
          <span className="material-icons icon">home</span>
          <p className="text">Home</p>
        </NavLink>
      </li>
      <li className="nav-bar-item">
        <NavLink 
          to="/profile" 
          activeClassName="active"
          className="link">
          <span className="material-icons icon">perm_identity</span>
          <p className="text">Profile</p>
        </NavLink>
      </li>
      <li>
        <Button 
          classes="medium dark"
          click={handleTweetButtonClick}>
          Tweet
        </Button>
      </li>
      <li>
        <Button
          classes={"medium light"}
          click={props.logout}>
          Logout
        </Button>
      </li>
    </ul>
  </>); 

}