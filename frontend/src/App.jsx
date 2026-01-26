import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />

        {/* Dashboard (solo login) */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Usuarios (login + permiso) */}
        <Route
          path="/users"
          element={
            <PrivateRoute permission={"users:view"}>
              <Users />
            </PrivateRoute>
          }
        />

        {/* Roles (login + permiso) */}
        <Route
          path="/roles"
          element={
            <PrivateRoute permission={"roles:view"}>
              <Roles />
            </PrivateRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
