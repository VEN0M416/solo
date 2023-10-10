import './Modal.css';

const Modal = ({ isOpen, onClose, children, head }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className='Head'>
          <h2>{head}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;