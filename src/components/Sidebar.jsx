import { LayoutDashboard, Users, LogOut, Menu } from "lucide-react";

function Sidebar({ collapsed, setCollapsed, active, setActive, role }) {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        <Menu />
      </button>

      <button onClick={() => setActive("dashboard")}
        className={active === "dashboard" ? "active" : ""}>
        <LayoutDashboard /> {!collapsed && "Dashboard"}
      </button>

      {role === "admin" && (
        <button onClick={() => setActive("users")}
          className={active === "users" ? "active" : ""}>
          <Users /> {!collapsed && "Users"}
        </button>
      )}

      <button>
        <LogOut /> {!collapsed && "Logout"}
      </button>
    </div>
  );
}

export default Sidebar;
