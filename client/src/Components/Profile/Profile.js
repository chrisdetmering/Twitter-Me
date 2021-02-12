import NavBar from "../NavBar/NavBar"; 

export default function Profile(props) { 
  const { setIsLoggedIn } = props; 

  return(<>
    <NavBar/>
    <h1>Profile</h1>
    <input type="text" placeholder="search twitter..."/>
    <button onClick={() => setIsLoggedIn(false)}>Logout</button>
  </>); 
}