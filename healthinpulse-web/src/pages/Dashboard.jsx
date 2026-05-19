import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MetricCard from "../components/MetricCard";
import BpmChart from "../components/BpmChart";

import useHealthMetrics from "../hooks/useHealthMetrics";

import "../styles/dashboard.css";

function Dashboard({ user }) {
  const {
    bpm,
    steps,
    calories,
    status,
    running,
    bpmHistory,
    generateData,
    toggleSimulation,
    simulateEmergency,
  } = useHealthMetrics();

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Header user={user} />

        <div className="dashboard-actions">
          <button
            className="action-btn primary"
            onClick={toggleSimulation}
          >
            <i
              className={
                running
                  ? "fa-solid fa-pause"
                  : "fa-solid fa-play"
              }
            ></i>

            {running ? "Pausar" : "Iniciar"}
          </button>

          <button
            className="action-btn danger"
            onClick={simulateEmergency}
          >
            <i className="fa-solid fa-triangle-exclamation"></i>
            Simular Emergência
          </button>

          <button
            className="action-btn ghost"
            onClick={generateData}
          >
            <i className="fa-solid fa-rotate"></i>
            Atualizar
          </button>
        </div>

        <section className="metrics-grid">
          <MetricCard
            title="BPM"
            value={bpm}
            icon="fa-solid fa-heart-pulse"
            color="#dbeafe"
          />

          <MetricCard
            title="Passos"
            value={steps.toLocaleString("pt-BR")}
            icon="fa-solid fa-shoe-prints"
            color="#dcfce7"
          />

          <MetricCard
            title="Calorias"
            value={calories.toLocaleString("pt-BR")}
            icon="fa-solid fa-fire"
            color="#fee2e2"
          />

          <MetricCard
            title="Status"
            value={status}
            icon="fa-solid fa-shield-heart"
            color={
              status === "PERIGO"
                ? "#fee2e2"
                : "#ede9fe"
            }
          />
        </section>

        <section className="dashboard-section">
          <BpmChart data={bpmHistory} />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;