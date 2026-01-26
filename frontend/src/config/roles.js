import { PERMISSIONS } from "./permissions";

const allPermissions = Object.values(PERMISSIONS)
  .flatMap(g => g.permissions.map(p => p.key));

export const ROLES = {
  admin: {
    name: "Administrador",
    permissions: allPermissions,
  },
  user: {
    name: "Usuario",
    permissions: [
      "users:view",
      "users:view",
      "users:create",
    ],
  },
};
