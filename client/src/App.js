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
  const [isLoggedIn, setIsLoggedIn] = useState(initialState); 


  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Login login={setIsLoggedIn}/>
          </Route>
          <Route exact path="/get-credentials"> 
            <GetCredentials login={setIsLoggedIn}/>
          </Route>
          <ProtectedRoute exact path="/home" isLoggedIn={isLoggedIn} >
            <Home setIsLoggedIn={setIsLoggedIn} />
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile" isLoggedIn={isLoggedIn} >
            <Profile setIsLoggedIn={setIsLoggedIn} />
          </ProtectedRoute>
        </Switch>
    </Router>);
}

export default App;
