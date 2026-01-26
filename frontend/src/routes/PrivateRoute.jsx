import { Navigate } from "react-router-dom";
import usePermissions from "../hooks/usePermissions";

export default function PrivateRoute({ children, permission }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) return <Navigate to="/login" />;

  if (permission) {
    const { can } = usePermissions(user);
    if (!can(permission)) return <Navigate to="/" />;
  }

  return children;
}
