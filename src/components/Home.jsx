import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  LogOut,
  Menu,
  Sun,
  Moon,
  Bell,
  Settings as SettingsIcon   // 👈 rename icon
} from "lucide-react";
import { ShoppingBag } from "lucide-react";
import Settings from "./Settings"; // 👈 component safe
import Products from "./Products";
import UserList from "./UserList";
import DashboardCharts from "./DashboardCharts";
import "../css/home.css";
import Reports from "./Reports";

function Home() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const role = "admin";

  return (
    <div className={`dashboard-layout ${darkMode ? "dark" : "light"}`}>

      {/* ===== SIDEBAR ===== */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          {!collapsed && <h2 className="logo">Admin Panel</h2>}
          <Menu
            className="collapse-icon"
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>

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
            className={activePage === "products" ? "active" : ""}
            onClick={() => setActivePage("products")}
           >
          <ShoppingBag size={18} />
         {!collapsed && "Products"}
      </button>

       <button
      className={activePage === "settings" ? "active" : ""}
        onClick={() => setActivePage("settings")}
      >
  <SettingsIcon size={18} />
  {!collapsed && "Settings"}
      </button>

        <button className="logout-btn" onClick={() => navigate("/")}>
          <LogOut size={18} />
          {!collapsed && "Logout"}
        </button>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="main-content">

        {/* TOP BAR */}
        <div className="topbar">
          <h2 className="page-title">Dashboard Overview</h2>

          <div className="topbar-actions">
            <Bell className="icon-btn" />
            <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>

        {activePage === "dashboard" && (
          <>
            {/* ===== INFORMATION HIERARCHY: STATS FIRST ===== */}
            <div className="stats">
              <div className="card info">
                <p>Total Users</p>
                <h3>1,240</h3>
                <span className="trend up">↑ 12% this month</span>
              </div>

              <div className="card success">
                <p>Active Users</p>
                <h3>980</h3>
                <span className="trend up">↑ 8% active</span>
              </div>

              <div className="card warning">
                <p>Pending Users</p>
                <h3>260</h3>
                <span className="trend down">↓ Needs review</span>
              </div>
            </div>

            {/* ===== CHART STORYTELLING ===== */}
            <DashboardCharts />
          </>
        )}

        {activePage === "users" && <UserList />}
        {activePage === "reports" && <h2><Reports /></h2>}
        {activePage === "products" && <Products />}
        {activePage === "settings" && <Settings />}
      </main>
    </div>
  );
}

export default Home;
