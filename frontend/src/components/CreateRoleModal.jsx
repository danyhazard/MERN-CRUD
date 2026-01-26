import { useState } from "react";
import Modal from "./Modal";
import PermissionGroup from "./PermissionGroup";
import api from "../services/api";
import { useAlert } from "../context/AlertContext";
import { PERMISSIONS } from "../config/permissions";

export default function CreateRoleModal({ onClose, onCreated }) {
  const { showAlert } = useAlert();
  const [form, setForm] = useState({
    name: "",
    key: "",
  });
  const [permissions, setPermissions] = useState([]);

  const handleNameChange = (e) => {
    const name = e.target.value;
    setForm({
      name,
      // Auto-generate key from name (lowercase, spaces to underscores)
      key: name.toLowerCase().replace(/\s+/g, "_"),
    });
  };

  const togglePermission = (perm) => {
    setPermissions((prev) =>
      prev.includes(perm)
        ? prev.filter((p) => p !== perm)
        : [...prev, perm]
    );
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.key) {
      showAlert("error", "Nombre y clave son requeridos");
      return;
    }

    try {
      await api.post("/api/roles", {
        name: form.name,
        key: form.key,
        permissions,
      });
      showAlert("success", "Rol creado correctamente");
      onCreated();
      onClose();
    } catch (error) {
      showAlert("error", error.response?.data?.message || "Error creando rol");
    }
  };

  return (
    <Modal title="Nuevo rol" onClose={onClose}>
      <form onSubmit={submit} className="create-role-form">
        <div className="form-group">
          <label htmlFor="role-name">Nombre del rol</label>
          <input
            id="role-name"
            type="text"
            placeholder="Nombre del rol"
            value={form.name}
            onChange={handleNameChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role-key">Clave del rol</label>
          <input
            id="role-key"
            type="text"
            placeholder="Clave única (ej: editor, viewer)"
            value={form.key}
            onChange={(e) => setForm({ ...form, key: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Permisos</label>
          <div className="permissions-scroll-container">
            {Object.values(PERMISSIONS).map((group) => (
              <PermissionGroup
                key={group.label}
                group={group}
                values={permissions}
                onChange={togglePermission}
              />
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button
            className="btn btn-secondary"
            onClick={onClose}
            type="button"
          >
            Cancelar
          </button>
          <button className="btn btn-primary">Crear</button>
        </div>
      </form>
    </Modal>
  );
}

