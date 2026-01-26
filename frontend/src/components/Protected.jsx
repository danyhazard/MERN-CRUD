import { Navigate } from "react-router-dom";
import usePermissions from "../hooks/usePermissions";

export default function Protected({ permission, children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { can } = usePermissions(user);

  if (!can(permission)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
