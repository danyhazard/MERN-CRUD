import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import RolePermissionsModal from "../components/RolePermissionsModal";
import CreateRoleModal from "../components/CreateRoleModal";
import { useAlert } from "../context/AlertContext";
import api from "../services/api";

export default function Roles() {
  const { showAlert } = useAlert();

  const [roles, setRoles] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadRoles = async () => {
    try {
      const res = await api.get("/api/roles");
      console.log("data", res, roles)
      setRoles(res.data);
    } catch {
      showAlert("error", "Error cargando roles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const savePermissions = async (permissions) => {
    try {
      await api.put(`/api/roles/${editing._id}`, {
        permissions,
      });

      showAlert("success", "Permisos actualizados correctamente");
      setEditing(null);

      // 🔄 Volver a cargar roles desde backend
      loadRoles();

      // 🔄 Actualizar permisos del usuario actual si tiene este rol
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (currentUser && currentUser.role === editing.key) {
        const updatedUser = { ...currentUser, permissions };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("userUpdated"));
      }
    } catch (error) {
      showAlert("error", "Error guardando permisos");
    }
  };


  const data = roles.map(role => ({
    _id: role._id,
    name: role.name,
    count: role.permissions.length,
  }));


  return (
    <Layout>
      <div className="page-header">
        <h1>Roles</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreate(true)}
        >
          + Nuevo rol
        </button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Table
          columns={[
            { label: "Rol", key: "name" },
            { label: "Permisos", key: "count" },
          ]}
          data={data}
          actions={(row) => (
            <button
              className="btn btn-secondary"
              onClick={() => {
                const role = roles.find(r => r._id === row._id);
                setEditing(role);
              }}

            >
              Editar permisos
            </button>
          )}
        />
      )}

      {editing && (
        <RolePermissionsModal
          role={editing}
          onClose={() => setEditing(null)}
          onSave={savePermissions}
        />
      )}

      {showCreate && (
        <CreateRoleModal
          onClose={() => setShowCreate(false)}
          onCreated={loadRoles}
        />
      )}
    </Layout>
  );
}
