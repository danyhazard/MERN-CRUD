export const PERMISSIONS = {
  users: {
    label: "Usuarios",
    permissions: [
      { key: "users:view", label: "Ver" },
      { key: "users:create", label: "Crear" },
      { key: "users:edit", label: "Editar" },
      { key: "users:delete", label: "Eliminar" },
    ],
  },

  roles: {
    label: "Roles",
    permissions: [
      { key: "roles:view", label: "Ver" },
      { key: "roles:create", label: "Crear" },
      { key: "roles:edit", label: "Editar" },
      { key: "roles:delete", label: "Eliminar" },
    ],
  },

  clients: {
    label: "Clientes",
    permissions: [
      { key: "clients:view", label: "Ver" },
      { key: "clients:create", label: "Crear" },
      { key: "clients:edit", label: "Editar" },
      { key: "clients:delete", label: "Eliminar" },
    ],
  },

  invoices: {
    label: "Facturas",
    permissions: [
      { key: "invoices:view", label: "Ver" },
      { key: "invoices:create", label: "Crear" },
    ],
  },
};
