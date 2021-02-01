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
import './App.css';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <ProtectedRoute exact path="/home">
            <Home/>
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile">
            <Profile/>
          </ProtectedRoute>
        </Switch>
    </Router>);
}

export default App;
