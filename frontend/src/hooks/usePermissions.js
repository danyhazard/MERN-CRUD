export default function usePermissions(user) {
  const permissions = user?.permissions || [];

  const can = (permission) => permissions.includes(permission);

  return { can };
}
