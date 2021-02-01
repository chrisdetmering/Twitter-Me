import NavBar from "../NavBar/NavBar"; 

export default function Profile(props) { 
  return(<>
    <NavBar/>
    <h1>Profile</h1>
    <input type="text" placeholder="search twitter..."/>
  </>); 
}