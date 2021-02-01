import NavBar from "../NavBar/NavBar"; 
export default function Home(props) { 
  return(<>
    <NavBar/>
    <h1>Home</h1>
    <input type="text" placeholder="search twitter..."/>
  </>); 
}