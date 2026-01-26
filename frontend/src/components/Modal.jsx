import "../styles/modal.css";

export default function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header">
          <h2>{title}</h2>
          {/* <button onClick={onClose}>✕</button> */}
        </header>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
