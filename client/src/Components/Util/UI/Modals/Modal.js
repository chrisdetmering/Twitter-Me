import "./Modal.css"; 

export default function Modal(props) { 
  
  if (!props.show) { 
    return null; 
  }
  
  return(<>
      <div onClick={props.close} id="modal-backdrop" className="modal">
        <div className="modal-content">
        <button onClick={props.close} id="modal-close-button">Close</button>
              {props.children}
        </div>
      </div>
      
     
  </>);
}