import "./Button.css"; 

export default function Button(props) { 
  const {classes, children, click} = props; 

  return( 
    <button 
      className={`button ${classes}`}
      onClick={click}>
      {children}</button>
  ); 
}