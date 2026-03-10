import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardUserBarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchUserChart();
  }, []);

  const fetchUserChart = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/dashboard/users/monthly-stats"
      );

      setChartData({
        labels: res.data.labels,
        datasets: [
          {
            label: "Users Registered",
            data: res.data.data,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 1
          }
        ]
      });
    } catch (error) {
      console.error("Chart API Error:", error);
    }
  };

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div style={{ width: "700px", margin: "auto" }}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Monthly User Registration"
            }
          }
        }}
      />
    </div>
  );
};

export default DashboardUserBarChart;