import Modal from "./Modal";
import PermissionGroup from "./PermissionGroup";
import { PERMISSIONS } from "../config/permissions";
import { useState } from "react";

export default function RolePermissionsModal({ role, onSave, onClose }) {
  const [permissions, setPermissions] = useState([...role.permissions]);

  const toggle = (perm) => {
    setPermissions(prev =>
      prev.includes(perm)
        ? prev.filter(p => p !== perm)
        : [...prev, perm]
    );
  };

  return (
    <Modal title={`Permisos: ${role.name}`} onClose={onClose}>
      <div className="role-permissions-form">
        <div className="permissions-scroll-container">
          {Object.values(PERMISSIONS).map(group => (
            <PermissionGroup
              key={group.label}
              group={group}
              values={permissions}
              onChange={toggle}
            />
          ))}
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onSave(permissions)}
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  );
}
