import {useState} from 'react'; 
import { 
  BrowserRouter as Router, 
  Switch, 
  Route
} from "react-router-dom"; 
import Login from "./Components/Login/Login"; 
import Home from "./Components/Home/Home"; 
import Profile from "./Components/Profile/Profile"; 
import ProtectedRoute from "./Components/Util/Auth/ProtectedRoute"; 
import GetCredentials from "./Components/Util/Auth/GetCredentials"; 
import './App.css';

function App() {
  const initialState = () => Boolean(localStorage.getItem("screen_name"));
  const [loggedIn, setLoggedIn] = useState(initialState); 


  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Login login={setLoggedIn}/>
          </Route>
          <Route exact path="/get-credentials"> 
            <GetCredentials login={setLoggedIn}/>
          </Route>
          <ProtectedRoute exact path="/home" loggedIn={loggedIn} >
            <Home setLoggedIn={setLoggedIn} />
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile" loggedIn={loggedIn} >
            <Profile setLoggedIn={setLoggedIn} />
          </ProtectedRoute>
        </Switch>
    </Router>);
}

export default App;
