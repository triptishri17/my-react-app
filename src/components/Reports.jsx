import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "../css/Reports.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Reports() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [typeFilter, reports]);

  const fetchReports = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/reports/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setReports(res.data.reports || []);
      setFilteredReports(res.data.reports || []);
    } catch (error) {
      console.error("Reports API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterReports = () => {
    if (typeFilter === "all") {
      setFilteredReports(reports);
    } else {
      setFilteredReports(reports.filter((r) => r.type === typeFilter));
    }
  };

  /* =====================
     DOWNLOAD EXCEL
     ===================== */
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredReports);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reports");
    XLSX.writeFile(wb, "reports.xlsx");
  };

  /* =====================
     DOWNLOAD PDF
     ===================== */
  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Reports Summary", 14, 16);

    filteredReports.forEach((r, i) => {
      pdf.text(`${i + 1}. ${r.title} (${r.type})`, 14, 26 + i * 8);
    });

    pdf.save("reports.pdf");
  };

  /* =====================
     CHART DATA
     ===================== */
  const chartData = {
    labels: filteredReports.map((r) => r.title),
    datasets: [
      {
        label: "Reports Count",
        data: filteredReports.map(() => 1),
      },
    ],
  };

  return (
    <div className={`reports-container ${darkMode ? "dark" : ""}`}>
      {/* HEADER */}
      <div className="reports-header">
        <h2>Reports</h2>
        <p>Analytics, summaries & downloadable reports</p>

        <div className="reports-actions">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Users">Users</option>
            <option value="Orders">Orders</option>
            <option value="Revenue">Revenue</option>
          </select>

          <button onClick={downloadExcel}>Excel</button>
          <button onClick={downloadPDF}>PDF</button>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      {/* SKELETON */}
      {loading && (
        <div className="reports-grid">
          {[1, 2, 3].map((i) => (
            <div className="report-skeleton" key={i} />
          ))}
        </div>
      )}

      {/* REPORTS */}
      {!loading && (
        <>
          <div className="reports-grid">
            {filteredReports.map((report) => (
              <div className="report-card" key={report._id}>
                <h4>{report.title}</h4>
                <p>{report.description}</p>

                <div className="report-footer">
                  <span className="report-type">{report.type}</span>
                  <span className="report-date">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CHART */}
          <div className="reports-chart">
            <h3>Reports Overview</h3>
            <Bar data={chartData} />
          </div>
        </>
      )}
    </div>
  );
}

export default Reports;