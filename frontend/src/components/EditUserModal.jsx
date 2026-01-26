import "../styles/modal.css";
import { useState } from "react";
import api from "../services/api";

export default function EditUserModal({ user, onClose, onUpdated, roles }) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.put(`/api/users/${user._id}`, form);
    onUpdated();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar usuario</h2>

        <form onSubmit={submit}>
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            {roles.map(role => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>

          <div className="modal-actions">
            <button className="btn btn-secondary" type="button" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
