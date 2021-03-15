import "./Modal.css"; 

export default function Modal(props) { 
  const {classes} = props
  if (!props.show) { 
    return null; 
  }
  
  return(<>
    <div 
      className="modal"
      id="modal-backdrop"
      onClick={props.close}>
      <div className={`modal-content`}>
        <span 
          className="material-icons close-button"
          id="modal-close-button"
          onClick={props.close}>
          clear
        </span>
        {props.children}
      </div>
    </div>
  </>);
}