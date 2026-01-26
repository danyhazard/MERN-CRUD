export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        Panel de control
      </div>

      <div className="navbar-right">
        <span className="user-name">Admin</span>
        <button onClick={logout}>Salir</button>
      </div>
    </header>
  );
}
