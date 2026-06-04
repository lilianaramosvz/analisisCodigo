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

const METRICS = [
  {
    key: "commits",
    label: "Commits",
    line: "#6ea8fe",
    fill: "rgba(110,168,254,0.15)",
  },
  {
    key: "bugs",
    label: "Bugs Fixed",
    line: "#f4a4a4",
    fill: "rgba(244,164,164,0.15)",
  },
  {
    key: "tasks",
    label: "Tasks",
    line: "#6fcf97",
    fill: "rgba(111,207,151,0.15)",
  },
  {
    key: "storyPoints",
    label: "Story Points",
    line: "#bb8eed",
    fill: "rgba(187,142,237,0.15)",
  },
];

function Dashboard() {
  const [allData, setAllData] = useState({});
  const [selected, setSelected] = useState(["commits"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const entries = await Promise.all(
          METRICS.map((m) => getMetricData(m.key).then((d) => [m.key, d])),
        );
        setAllData(Object.fromEntries(entries));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const toggleMetric = (key) => {
    setSelected((prev) =>
      prev.includes(key)
        ? prev.length > 1
          ? prev.filter((k) => k !== key)
          : prev
        : [...prev, key],
    );
  };

  const labels = allData[selected[0]]?.map((item) => item.label) ?? [];

  const chartData = {
    labels,
    datasets: selected.map((key) => {
      const metric = METRICS.find((m) => m.key === key);
      const data = allData[key] ?? [];
      return {
        label: metric.label,
        data: data.map((item) => item.value),
        borderColor: metric.line,
        backgroundColor: metric.fill,
        fill: selected.length === 1,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      };
    }),
  };

  const chartOptions = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index" },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.05)" } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Dashboard de Métricas</h1>
          <p className={styles.subtitle}>
            Selecciona una o más métricas para comparar
          </p>
        </header>

        {loading ? (
          <p className={styles.loading}>Cargando datos...</p>
        ) : (
          <>
            <div className={styles.statsGrid}>
              {METRICS.map((m) => {
                const data = allData[m.key] ?? [];
                const total = data.reduce((s, i) => s + i.value, 0);
                const promedio =
                  data.length > 0 ? (total / data.length).toFixed(1) : 0;
                const maximo =
                  data.length > 0 ? Math.max(...data.map((x) => x.value)) : 0;
                return (
                  <MetricCard
                    key={m.key}
                    metric={m}
                    total={total}
                    promedio={promedio}
                    maximo={maximo}
                    active={selected.includes(m.key)}
                    onClick={() => toggleMetric(m.key)}
                  />
                );
              })}
            </div>

            <div className={styles.chartCard}>
              <h2 className={styles.chartTitle}>Evolución comparativa</h2>
              <Line data={chartData} options={chartOptions} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MetricCard({ metric, total, promedio, maximo, active, onClick }) {
  return (
    <button
      className={`${styles.metricCard} ${active ? styles.cardActive : styles.cardInactive}`}
      style={active ? { borderTop: `3px solid ${metric.line}` } : {}}
      onClick={onClick}
      title={active ? "Clic para ocultar" : "Clic para mostrar"}
    >
      <div className={styles.cardHeader}>
        <span className={styles.cardDot} style={{ background: metric.line }} />
        <span
          className={styles.cardName}
          style={active ? { color: metric.line } : {}}
        >
          {metric.label}
        </span>
      </div>
      <div className={styles.cardStats}>
        <StatItem label="Total" value={total} />
        <StatItem label="Prom." value={promedio} />
        <StatItem label="Máx." value={maximo} />
      </div>
    </button>
  );
}

function StatItem({ label, value }) {
  return (
    <div className={styles.statItem}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  );
}

export default Dashboard;
