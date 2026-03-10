import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut
} from "lucide-react";
import "../css/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Admin Panel</div>

      <nav className="sidebar-menu">
        <NavLink to="/home" className="menu-item">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/users" className="menu-item">
          <Users size={18} />
          <span>Users</span>
        </NavLink>

        <NavLink to="/reports" className="menu-item">
          <FileText size={18} />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/settings" className="menu-item">
          <FileText size={18} />
          <span>Settiasdfasdfngs</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;