import Sidebar from "../components/Sidebar";
import { mockPatients } from "../data/mockPatients";
import { getExams } from "../services/examService";
import "../styles/patientDetails.css";

function PatientDetails({ patientId, onNavigate, onLogout }) {
    const patient =
        mockPatients.find((item) => item.id === patientId) || mockPatients[0];

    const exams = getExams();

    return (
        <div className="dashboard-layout">
            <Sidebar
                currentScreen="doctor"
                onNavigate={onNavigate}
                onLogout={onLogout}
            />

            <main className="dashboard-main">
                <header className="patient-detail-header">
                    <div>
                        <button onClick={() => onNavigate("doctor")}>
                            <i className="fa-solid fa-arrow-left"></i>
                            Voltar
                        </button>

                        <h1>{patient.name}</h1>
                        <p>
                            {patient.age} anos • {patient.email}
                        </p>
                    </div>

                    <span className={`risk-badge ${patient.risk.toLowerCase()}`}>
                        Risco {patient.risk}
                    </span>
                </header>

                <section className="patient-detail-grid">
                    <div className="patient-detail-card">
                        <span>BPM Atual</span>
                        <strong>{patient.bpm}</strong>
                    </div>

                    <div className="patient-detail-card">
                        <span>Passos</span>
                        <strong>{patient.steps.toLocaleString("pt-BR")}</strong>
                    </div>

                    <div className="patient-detail-card">
                        <span>Calorias</span>
                        <strong>{patient.calories}</strong>
                    </div>

                    <div className="patient-detail-card">
                        <span>Status</span>
                        <strong>{patient.status}</strong>
                    </div>
                </section>

                <section className="clinical-section">
                    <h2>Alertas clínicos</h2>

                    {patient.alerts.length ? (
                        patient.alerts.map((alert) => (
                            <div className="clinical-alert" key={alert}>
                                <i className="fa-solid fa-triangle-exclamation"></i>
                                {alert}
                            </div>
                        ))
                    ) : (
                        <p>Nenhum alerta crítico identificado.</p>
                    )}
                </section>

                <section className="clinical-section">
                    <h2>Exames vinculados</h2>

                    {exams.map((exam) => (
                        <div className="clinical-exam" key={exam.id}>
                            <i className="fa-solid fa-file-medical"></i>

                            <div>
                                <strong>{exam.name}</strong>
                                <p>
                                    {exam.type} • {exam.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}

export default PatientDetails;