import { 
  Route, 
  Redirect,
} from "react-router-dom"; 

export default function ProtectedRoute(props) { 
  const { children, isLoggedIn } = props; 
  return( 
    <Route
      render={({location}) => 
        isLoggedIn ? ( 
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