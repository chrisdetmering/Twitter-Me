import { 
  Route, 
  Redirect,
} from "react-router-dom"; 

export default function ProtectedRoute(props) { 
  const { children, loggedIn } = props; 
  return( 
    <Route
      render={({location}) => 
        loggedIn ? ( 
          children
        ) : ( 
          <Redirect 
           to={{
             pathname: "/", 
             state: { from: location }
           }}
          />
        )
      }
    />
  );

}