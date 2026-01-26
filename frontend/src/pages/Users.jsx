import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Badge from "../components/Badge";
import CreateUserModal from "../components/CreateUserModal";
import EditUserModal from "../components/EditUserModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { useAlert } from "../context/AlertContext";
import usePermissions from "../hooks/usePermissions";
import { PERMISSIONS } from "../config/permissions";
import api from "../services/api";

export default function Users() {
  const { showAlert } = useAlert();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { can } = usePermissions(currentUser);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);

  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const loadUsers = async () => {
    try {
      const res = await api.get("/api/users");
      setUsers(res.data);
    } catch {
      showAlert("error", "Error cargando usuarios");
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
      try {
        const res = await api.get("/api/roles");
        console.log("data", res, roles)
        setRoles(res.data);
      } catch {
        showAlert("error", "Error cargando usuarios");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  const deleteUser = async (id) => {
    try {
      await api.delete(`/api/users/${id}`);
      showAlert("success", "Usuario eliminado");
      loadUsers();
    } catch {
      showAlert("error", "Error eliminando usuario");
    }
  };

  const columns = [
    { label: "Nombre", key: "name" },
    { label: "Email", key: "email" },
    {
      label: "Rol",
      key: "role",
      render: (value) => (
        <Badge type={value}>{value}</Badge>
      ),
    },
  ];

  return (
    <Layout>
      {/* HEADER */}
      <div className="page-header">
        <h1>Usuarios</h1>

        {can("users:create") && (
          <button
            className="btn btn-primary"
            onClick={() => setShowCreate(true)}
          >
            + Nuevo usuario
          </button>
        )}
      </div>

      {/* TABLE */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Table
          columns={columns}
          data={users}
          actions={(user) => (
            <>
              {can("users:edit") && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditing(user)}
                >
                  Editar
                </button>
              )}

              {can("users:delete") && (
                <button
                  className="btn btn-danger"
                  onClick={() => setConfirmDelete(user)}
                >
                  Eliminar
                </button>
              )}
            </>
          )}
        />
      )}

      {/* MODALS */}
      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onCreated={loadUsers}
          roles={roles}
        />
      )}

      {editing && (
        <EditUserModal
          user={editing}
          onClose={() => setEditing(null)}
          onUpdated={loadUsers}
          roles={roles}
        />
      )}

      {confirmDelete && (
        <ConfirmDialog
          message={`¿Eliminar al usuario "${confirmDelete.name}"?`}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => {
            deleteUser(confirmDelete._id);
            setConfirmDelete(null);
          }}
        />
      )}
    </Layout>
  );
}
