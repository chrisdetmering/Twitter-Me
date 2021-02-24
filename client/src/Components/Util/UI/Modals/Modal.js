import "./Modal.css"; 

export default function Modal(props) { 
  
  if (!props.show) { 
    return null; 
  }
  
  return(<>
      <div onClick={props.close} id="ModalBackDrop" className="Modal">
        <div className="ModalContent">
        <button onClick={props.close} id="ModalCloseButton">Close</button>
              {props.children}
        </div>
      </div>
      
     
  </>);
}