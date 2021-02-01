import NavBar from "../NavBar/NavBar"; 

export default function Profile(props) { 
  const { setLoggedIn } = props; 

  return(<>
    <NavBar/>
    <h1>Profile</h1>
    <input type="text" placeholder="search twitter..."/>
    <button onClick={() => setLoggedIn(false)}>Logout</button>
  </>); 
}