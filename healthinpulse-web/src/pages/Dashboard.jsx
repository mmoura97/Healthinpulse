import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Dashboard() {
  const [bpm, setBpm] = useState(75);
  const [passos, setPassos] = useState(0);
  const [calorias, setCalorias] = useState(0);
  const [status, setStatus] = useState("Monitorando");
  const [simulando, setSimulando] = useState(false);

  // 🔁 Simulação automática
  useEffect(() => {
    let interval;

    if (simulando) {
      interval = setInterval(() => {
        gerarDadoAleatorio();
      }, 2500);
    }

    return () => clearInterval(interval);
  }, [simulando]);

  function gerarDadoAleatorio() {
    const novoBPM = Math.floor(Math.random() * (110 - 60) + 60);
    const novosPassos = Math.floor(Math.random() * 50);
    const novasCalorias = Math.floor(Math.random() * 10);

    setBpm(novoBPM);
    setPassos((prev) => prev + novosPassos);
    setCalorias((prev) => prev + novasCalorias);
    setStatus("Monitorando");
  }

  function toggleSimulacao() {
    setSimulando(!simulando);
  }

  function simularEmergencia() {
    setBpm(165);
    setStatus("PERIGO");
    alert("⚠️ Emergência detectada!");
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="header-buttons">
          <button className="btn btn-white" onClick={toggleSimulacao}>
            {simulando ? "Pausar" : "Iniciar"}
          </button>

          <button className="btn btn-red" onClick={simularEmergencia}>
            Simular Emergência
          </button>

          <button className="btn btn-outline" onClick={gerarDadoAleatorio}>
            Atualizar
          </button>
        </div>

        <div className="dashboard-grid">
          {/* BPM */}
          <div className="card summary-card">
            <div className="summary-info">
              <h3>Frequência Cardíaca</h3>
              <div>
                <span className="value">{bpm}</span>{" "}
                <span className="unit">BPM</span>
              </div>
            </div>
          </div>

          {/* PASSOS */}
          <div className="card summary-card">
            <div className="summary-info">
              <h3>Passos Hoje</h3>
              <div>
                <span className="value">{passos}</span>{" "}
                <span className="unit">passos</span>
              </div>
            </div>
          </div>

          {/* CALORIAS */}
          <div className="card summary-card">
            <div className="summary-info">
              <h3>Calorias</h3>
              <div>
                <span className="value">{calorias}</span>{" "}
                <span className="unit">kcal</span>
              </div>
            </div>
          </div>

          {/* STATUS */}
          <div className="card summary-card">
            <div className="summary-info">
              <h3>Status</h3>
              <div>
                <span
                  className="value"
                  style={{
                    color: status === "PERIGO" ? "red" : "green",
                  }}
                >
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}