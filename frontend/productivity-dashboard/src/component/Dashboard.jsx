//frontend\productivity-dashboard\src\component\Dashboard.jsx
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import styles from "../styles/Dashboard.module.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { getMetricData } from "../services/metricsService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await getMetricData("commits");
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const promedio = data.length > 0 ? (total / data.length).toFixed(1) : 0;

  const maximo = data.length > 0 ? Math.max(...data.map((x) => x.value)) : 0;

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Commits",
        data: data.map((item) => item.value),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className={styles.container}>
      <h1>Dashboard de Métricas</h1>

      <div className={styles.statsGrid}>
        <MetricCard title="Total Commits" value={total} />

        <MetricCard title="Promedio Diario" value={promedio} />

        <MetricCard title="Máximo" value={maximo} />
      </div>

      <div className={styles.chartContainer}>
        <h2>Evolución de Commits</h2>

        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className={styles.metricCard}>
      <h4 className={styles.cardTitle}>{title}</h4>

      <h2 className={styles.cardValue}>{value}</h2>
    </div>
  );
}

export default Dashboard;
