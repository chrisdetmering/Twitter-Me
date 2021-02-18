import "./NavBar.css"; 
import { 
  NavLink
} from "react-router-dom";


export default function NavBar(props) { 


  function handleTweetButtonClick() { 
    alert("model pop up"); 

  }

  return(
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
  ); 

}