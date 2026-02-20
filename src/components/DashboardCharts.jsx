import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import CountUp from "react-countup";
import "../css/DashboardCharts.css";

/* WEEKLY & MONTHLY DATA */
const weeklyData = [
  { name: "Mon", value: 10 },
  { name: "Tue", value: 20 },
  { name: "Wed", value: 15 },
  { name: "Thu", value: 18 },
  { name: "Fri", value: 25 },
];

const monthlyData = [
  { name: "Jan", value: 80 },
  { name: "Feb", value: 65 },
  { name: "Mar", value: 100 },
  { name: "Apr", value: 90 },
];

/* PIE DATA */
const pieData = [
  { name: "Active", value: 80 },
  { name: "Inactive", value: 20 },
];

const COLORS = ["#22c55e", "#ef4444"];

function DashboardCharts() {
  const [view, setView] = useState("monthly");

  const chartData = view === "weekly" ? weeklyData : monthlyData;

  return (
    <div className="charts">

      {/* ===== BAR CHART CARD ===== */}
      <div className="chart-card">
        <div className="chart-header">
          <h4>User Overview</h4>

          {/* TOGGLE */}
          <div className="chart-toggle">
            <button
              className={view === "weekly" ? "active" : ""}
              onClick={() => setView("weekly")}
            >
              Weekly
            </button>
            <button
              className={view === "monthly" ? "active" : ""}
              onClick={() => setView("monthly")}
            >
              Monthly
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* VALUES BELOW BAR CHART */}
        <div className="chart-values">
          {chartData.map((item) => (
            <div key={item.name} className="value-item">
              <span className="label">{item.name}</span>
              <span className="number">
                <CountUp end={item.value} duration={1.2} />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== PIE CHART CARD ===== */}
      <div className="chart-card">
        <h4>User Status</h4>

        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="45%"
              outerRadius={80}
              label
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* LEGEND WITH COUNTUP */}
        <div className="chart-legend">
          {pieData.map((item, i) => (
            <div key={item.name} className="legend-item">
              <span
                className="dot"
                style={{ background: COLORS[i] }}
              />
              <span className="label">{item.name}</span>
              <span className="number">
                <CountUp end={item.value} duration={1.2} />%
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default DashboardCharts;
