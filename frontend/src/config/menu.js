import { PERMISSIONS } from "./permissions";

export const MENU = [
  {
    label: "Dashboard",
    path: "/",
    permission: null, // solo login
  },
  {
    label: "Usuarios",
    path: "/users",
    permission: "users:view",
  },
  {
    label: "Roles",
    path: "/roles",
    permission: "roles:view",
  },
  {
    label: "Clientes",
    path: "/clients",
    permission: "clients:view",
  },
];
