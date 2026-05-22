import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MetricCard from "../components/MetricCard";
import BpmChart from "../components/BpmChart";
import CaloriesChart from "../components/CaloriesChart";
import GoalsSection from "../components/GoalsSection";
import MeasurementsHistory from "../components/MeasurementsHistory";
import AddDataModal from "../components/AddDataModal";
import MobileMenuButton from "../components/MobileMenuButton";

import useHealthMetrics from "../hooks/useHealthMetrics";

import "../styles/dashboard.css";

function Dashboard({ user, onNavigate, onLogout }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    bpm,
    steps,
    calories,
    status,
    running,
    bpmHistory,
    caloriesHistory,
    measurements,
    goals,
    generateData,
    toggleSimulation,
    simulateEmergency,
    addManualData,
  } = useHealthMetrics();

  return (
    <div className="dashboard-layout">
      <Sidebar
        currentScreen="dashboard"
        onNavigate={onNavigate}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="dashboard-main">
        <MobileMenuButton
          onClick={() => setSidebarOpen(true)}
        />

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

          <button
            className="action-btn ghost"
            onClick={() => setModalOpen(true)}
          >
            <i className="fa-solid fa-plus"></i>
            Adicionar Dados
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

        <section className="charts-grid">
          <BpmChart data={bpmHistory} />

          <CaloriesChart data={caloriesHistory} />
        </section>

        <GoalsSection goals={goals} />

        <MeasurementsHistory
          measurements={measurements}
        />

        <AddDataModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={addManualData}
        />
      </main>
    </div>
  );
}

export default Dashboard;