import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import MobileMenuButton from "../components/MobileMenuButton";

import { mockPatients } from "../data/mockPatients";
import { getExams } from "../services/examService";

import "../styles/doctor.css";

function DoctorDashboard({ user, onNavigate, onLogout, onOpenPatient }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [exams, setExams] = useState([]);

    useEffect(() => {
        setExams(getExams());
    }, []);

    const criticalPatients = mockPatients.filter(
        (patient) => patient.risk === "Alto"
    );

    const pendingAlerts = mockPatients.reduce(
        (total, patient) => total + patient.alerts.length,
        0
    );

    const pendingExams = exams.filter(
        (exam) => exam.status === "Pendente" || exam.status === "Revisar"
    );

    return (
        <div className="dashboard-layout">
            <Sidebar
                currentScreen="doctor"
                onNavigate={onNavigate}
                onLogout={onLogout}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="dashboard-main">
                <MobileMenuButton onClick={() => setSidebarOpen(true)} />

                <header className="doctor-header">
                    <div>
                        <h1>Painel Médico</h1>
                        <p>Visão clínica consolidada dos pacientes monitorados</p>
                    </div>

                    <div className="doctor-profile">
                        <i className="fa-solid fa-user-doctor"></i>
                        <span>{user?.name || "Médico"}</span>
                    </div>
                </header>

                <section className="doctor-grid">
                    <div className="doctor-card danger">
                        <span>Alertas críticos</span>
                        <strong>{criticalPatients.length}</strong>
                        <p>Pacientes com sinais fora do padrão</p>
                    </div>

                    <div className="doctor-card">
                        <span>Pacientes ativos</span>
                        <strong>{mockPatients.length}</strong>
                        <p>Monitoramento em tempo real</p>
                    </div>

                    <div className="doctor-card warning">
                        <span>Alertas pendentes</span>
                        <strong>{pendingAlerts}</strong>
                        <p>Ocorrências aguardando revisão</p>
                    </div>

                    <div className="doctor-card success">
                        <span>Exames para revisar</span>
                        <strong>{pendingExams.length}</strong>
                        <p>Arquivos enviados pelos pacientes</p>
                    </div>
                </section>

                <section className="doctor-panel">
                    <h2>Pacientes monitorados</h2>

                    <div className="priority-list">
                        {mockPatients.map((patient) => (
                            <div
                                key={patient.id}
                                onClick={() => onOpenPatient(patient.id)}
                                className={`priority-item ${patient.risk === "Alto"
                                        ? "high"
                                        : patient.risk === "Moderado"
                                            ? "medium"
                                            : "low"
                                    }`}
                            >
                                <div>
                                    <strong>{patient.name}</strong>
                                    <p>
                                        {patient.status} • {patient.bpm} BPM •{" "}
                                        {patient.lastUpdate}
                                    </p>

                                    {patient.alerts.length > 0 && (
                                        <small>{patient.alerts[0]}</small>
                                    )}
                                </div>

                                <span>{patient.risk}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="doctor-panel doctor-exams-panel">
                    <div className="doctor-panel-header">
                        <div>
                            <h2>Exames enviados</h2>
                            <p>Últimos arquivos disponíveis para análise médica</p>
                        </div>

                        <button onClick={() => onNavigate("exams")}>
                            Ver central de exames
                        </button>
                    </div>

                    <div className="doctor-exams-list">
                        {exams.map((exam) => (
                            <div className="doctor-exam-item" key={exam.id}>
                                <div className="doctor-exam-icon">
                                    <i
                                        className={
                                            exam.type === "PDF"
                                                ? "fa-solid fa-file-pdf"
                                                : "fa-solid fa-file-medical"
                                        }
                                    ></i>
                                </div>

                                <div>
                                    <strong>{exam.name}</strong>
                                    <p>
                                        {exam.type} • {exam.category} • {exam.date}
                                    </p>
                                </div>

                                <span
                                    className={
                                        exam.status === "Normal"
                                            ? "exam-status normal"
                                            : exam.status === "Revisar"
                                                ? "exam-status warning"
                                                : "exam-status pending"
                                    }
                                >
                                    {exam.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default DoctorDashboard;