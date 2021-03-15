import "./LoadingSpinner.css"; 

export default function Spinner(props) { 
  const {klass} = props; 
  let classes = 'loader'; 
  if (klass) { 
    classes += ` ${klass}`;
  }

  return (
    <div className="loader-container">
      <div className={`${classes}`}></div>
    </div>

  );

}