import "./NavBar.css"; 
import { 
  NavLink
} from "react-router-dom";


export default function NavBar(props) { 
  return(
    <ul>
      <li>
        <NavLink to="/home" activeClassName="active">home</NavLink>
      </li>
      <li>
        <NavLink to="/profile" activeClassName="active">profile</NavLink>
      </li>
    </ul>
  ); 

}