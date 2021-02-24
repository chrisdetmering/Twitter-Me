import {useEffect, useState} from 'react'; 
import Details from "./Details/Details";
import NavBar from "../NavBar/NavBar"; 
import Modal from "../Util/UI/Modals/Modal";
import TweetSearch from "../TweetSearch/TweetSearch"; 
export default function Profile(props) { 
  const { setIsLoggedIn } = props; 
  const [profileDetails, setProfileDetails] = useState(null); 
  const [showModal, setShowModal] = useState(false);  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => { 
    getProfileDetails(); 
  }, []);

  function getProfileDetails() { 
    fetch('api/profile-details')
    .then(data => data.json())
    .then(response => { 
      setName(response.name);
      setDescription(response.description);
      setProfileDetails(response);
      
    })
    .catch(error => { 
      alert(`There was the following network error ${error}`)
      console.error(error); 
    })
    
  }

  function handleEditProfileClick() { 
   
    setShowModal(true);
  }

  function handleCloseModalClick(event) { 
    const isBackDropClicked = event.target.id === "ModalBackDrop"; 
    const isCloseButtonClicked = event.target.id === "ModalCloseButton"; 

    if (isBackDropClicked || isCloseButtonClicked) { 
      setShowModal(false); 
    }
  }

  function handleEditProfileSubmit(event){ 
    event.preventDefault();
    fetch(`/api/profile-update?name=${name}&description=${description}`, { 
      method: "POST"
    })
    .then(data => {
        return data.json()
    })
    .then(response => { 
      if (response) { 
        setName(response.name);
        setDescription(response.description);
        setProfileDetails(response);
      }
    })
    .catch(error => { 
      alert(`There was the following network error ${error}`)
      console.error(error); 
    })
    .finally(() => setShowModal(false));
  }

  function handleDescriptionChange(event) { 
    const newDescription = event.target.value; 
    setDescription(newDescription);
  }

  function handleNameChange(event) { 
    const newName = event.target.value; 
    setName(newName); 
  }


  return(<>
    <Modal show={showModal} close={handleCloseModalClick}>
      <h1>Edit Profile</h1> 
      <form onSubmit={handleEditProfileSubmit}>
          <input onChange={handleNameChange} value={name}/>
          <br />
          <textarea
            rows="4"
            cols="50"
            onChange={handleDescriptionChange} value={description}>
          </textarea>
          <br />
          <input type="submit" value="Save"/>
      </form>
    </Modal>
    <NavBar logout={() => setIsLoggedIn(false)}/>

    <Details 
      details={profileDetails}
      onEditButtonClick={handleEditProfileClick}
    />
    <TweetSearch />
  </>); 
}