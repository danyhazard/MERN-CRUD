import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/api/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/");
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={submit}>
        <h2>Iniciar sesión</h2>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={e => setPassword(e.target.value)}
        />
        <button>Entrar</button>
      </form>
    </div>
  );
}
