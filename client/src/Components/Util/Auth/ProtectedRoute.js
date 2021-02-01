import { 
  Route, 
  Redirect,
} from "react-router-dom"; 

export default function ProtectedRoute(props) { 
  const { children } = props; 
  return( 
    <Route
      render={({location}) => 
        localStorage.getItem("user") ? ( 
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