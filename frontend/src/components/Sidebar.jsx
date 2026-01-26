import { NavLink } from "react-router-dom";
import { MENU } from "../config/menu";
import usePermissions from "../hooks/usePermissions";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { can } = usePermissions(user);
  
  return (
    <aside className="sidebar">
      <nav>
        {MENU.filter(item => {
          if (!item.permission) return true;
          return can(item.permission);
        }).map(item => (
          <NavLink key={item.path} to={item.path}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
