import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Sun,
  Moon
} from "lucide-react";

import UserList from "./UserList";
import DashboardCharts from "./DashboardCharts";
import "../css/home.css";

function Home() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  // 🌙 DARK MODE STATE
  const [darkMode, setDarkMode] = useState(false);

  const role = "admin";

  return (
    <div className={`dashboard-layout ${darkMode ? "dark" : "light"}`}>

      {/* ===== SIDEBAR ===== */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

        {/* HEADER */}
        <div className="sidebar-header">
          {!collapsed && <h2 className="logo">Admin Panel</h2>}

          <div className="header-actions">
            {/* DARK MODE TOGGLE */}
            <button
              className="icon-btn"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* COLLAPSE */}
            <Menu
              className="collapse-icon"
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
        </div>

        {/* MENU */}
        <button
          className={activePage === "dashboard" ? "active" : ""}
          onClick={() => setActivePage("dashboard")}
        >
          <LayoutDashboard size={18} />
          {!collapsed && "Dashboard"}
        </button>

        {role === "admin" && (
          <>
            <button
              className={activePage === "users" ? "active" : ""}
              onClick={() => setActivePage("users")}
            >
              <Users size={18} />
              {!collapsed && "Users"}
            </button>

            <button
              className={activePage === "reports" ? "active" : ""}
              onClick={() => setActivePage("reports")}
            >
              <BarChart3 size={18} />
              {!collapsed && "Reports"}
            </button>
          </>
        )}

        <button
          className={activePage === "settings" ? "active" : ""}
          onClick={() => setActivePage("settings")}
        >
          <Settings size={18} />
          {!collapsed && "Settings"}
        </button>

        <button className="logout-btn" onClick={() => navigate("/")}>
          <LogOut size={18} />
          {!collapsed && "Logout"}
        </button>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="main-content">
        {activePage === "dashboard" && (
          <>
            <h2>Dashboard</h2>
            <div className="stats">
              <div className="card"><h4>Total Users</h4><p>100</p></div>
              <div className="card"><h4>Active Users</h4><p>80</p></div>
              <div className="card"><h4>Pending</h4><p>20</p></div>
            </div>
            <DashboardCharts />
          </>
        )}

        {activePage === "users" && <UserList />}
        {activePage === "reports" && <h2>📊 Reports</h2>}
        {activePage === "settings" && <h2>⚙️ Settings</h2>}
      </main>
    </div>
  );
}

export default Home;
