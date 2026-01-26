import { useState } from "react";
import Modal from "./Modal";
import api from "../services/api";
import { useAlert } from "../context/AlertContext";

export default function CreateUserModal({ onClose, onCreated, roles }) {
  const { showAlert } = useAlert();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/api/users", form);
    showAlert("success", "Usuario creado correctamente");
    onCreated();
    onClose();
  };

  return (
    <Modal title="Nuevo usuario" onClose={onClose}>
      <form onSubmit={submit}>
        <input placeholder="Nombre" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <select onChange={e => setForm({ ...form, role: e.target.value })}>
          {roles.map(role => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose} type="button">
            Cancelar
          </button>
          <button className="btn btn-primary">Crear</button>
        </div>
      </form>
    </Modal>
  );
}
