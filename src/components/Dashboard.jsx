import { useEffect, useState } from "react";
import { Users, UserCheck, Clock, Moon, Sun } from "lucide-react";
import DashboardCharts from "../charts/DashboardCharts";
import StatCard from "./StatCard";
import { getDashboardStats } from "../services/dashboard.service";
import "../css/Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [theme, setTheme] = useState("light");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // admin | user

  useEffect(() => {
    if (role === "admin") {
      getDashboardStats(token).then(setStats);
    }
  }, [token, role]);

  // 🌙 THEME TOGGLE
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (role !== "admin") {
    return <h2>Welcome User 👋</h2>;
  }

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Admasdfasdfin Dashboard</h2>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>

      {/* STATS */}
      {/* <div className="stats">
        <StatCard
          title="Total Users"
          value={stats.total}
          icon={Users}
          color="#0d6efd"
          path="/home/users"
        />

        <StatCard
          title="Active Users"
          value={stats.active}
          icon={UserCheck}
          color="#198754"
          path="/home/users?status=active"
        />

        <StatCard
          title="Pending Users"
          value={stats.pending}
          icon={Clock}
          color="#ffc107"
          path="/home/users?status=pending"
        />
      </div> */}

      {/* <DashboardCharts /> */}
    </div>
  );
}

export default Dashboard;
