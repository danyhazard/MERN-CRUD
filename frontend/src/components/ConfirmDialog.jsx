import Modal from "./Modal";

export default function ConfirmDialog({ message, onConfirm, onClose }) {
  return (
    <Modal title="Confirmar acción" onClose={onClose}>
      <p>{message}</p>

      <div className="modal-actions">
        <button className="btn btn-secondary" onClick={onClose}>
          Cancelar
        </button>
        <button className="btn btn-danger" onClick={onConfirm}>
          Confirmar
        </button>
      </div>
    </Modal>
  );
}
