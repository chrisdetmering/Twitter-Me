import './ErrorMessage.css';

export default function ErrorMessage(props) { 
  return ( 
    <div className="error-message">
          <p>{props.messageOne}</p>
          <p>{props.messageTwo}</p>
    </div>
  );
}