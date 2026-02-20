import { useEffect, useState } from "react";
import { Users, UserCheck, Clock } from "lucide-react";
import DashboardCharts from "../charts/DashboardCharts";
import StatCard from "./StatCard";
import { getDashboardStats } from "../services/dashboard.service";

function Dashboard() {
  const [stats, setStats] = useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "admin" | "user"

  useEffect(() => {
    if (role === "admin") {
      getDashboardStats(token).then(setStats);
    }
  }, [token, role]);

  if (role !== "admin") {
    return <h2>Welcome User 👋</h2>;
  }

  if (!stats) return <p>Loading...</p>;

  return (
    <>
      {/* STATS */}
      <div className="stats">
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
      </div>

      <DashboardCharts />
    </>
  );
}

export default Dashboard;
