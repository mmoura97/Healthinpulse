import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import MobileMenuButton from "../components/MobileMenuButton";

import {
    addExam,
    deleteExam,
    getExams,
} from "../services/examService";

import "../styles/exams.css";

function Exams({ onNavigate, onLogout }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [exams, setExams] = useState([]);
    const [filter, setFilter] = useState("todos");
    const [selectedExam, setSelectedExam] = useState(null);

    useEffect(() => {
        setExams(getExams());
    }, []);

    async function handleUpload(event) {
        const file = event.target.files[0];

        if (!file) return;

        const updated = await addExam(file);

        setExams(updated);

        event.target.value = "";
    }

    function handleDelete(event, examId) {
        event.stopPropagation();

        const updated = deleteExam(examId);

        setExams(updated);

        if (selectedExam?.id === examId) {
            setSelectedExam(null);
        }
    }

    const filteredExams =
        filter === "todos"
            ? exams
            : exams.filter((exam) => exam.category === filter);

    return (
        <div className="dashboard-layout">
            <Sidebar
                currentScreen="exams"
                onNavigate={onNavigate}
                onLogout={onLogout}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="dashboard-main">
                <MobileMenuButton onClick={() => setSidebarOpen(true)} />

                <header className="exams-header">
                    <div>
                        <h1>Exames</h1>
                        <p>Central de exames e documentos clínicos</p>
                    </div>
                </header>

                <section className="exam-upload">
                    <div className="upload-icon">
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                    </div>

                    <h2>Enviar novo exame</h2>
                    <p>Selecione um arquivo para adicionar à central clínica</p>

                    <input type="file" onChange={handleUpload} />
                </section>

                <section className="exam-list">
                    <div className="exam-list-header">
                        <div>
                            <h2>Últimos exames</h2>
                            <p>{filteredExams.length} registros encontrados</p>
                        </div>

                        <div className="exam-filters">
                            <button
                                className={filter === "todos" ? "active" : ""}
                                onClick={() => setFilter("todos")}
                            >
                                Todos
                            </button>

                            <button
                                className={filter === "laboratorial" ? "active" : ""}
                                onClick={() => setFilter("laboratorial")}
                            >
                                Laboratorial
                            </button>

                            <button
                                className={filter === "cardiologico" ? "active" : ""}
                                onClick={() => setFilter("cardiologico")}
                            >
                                Cardio
                            </button>

                            <button
                                className={filter === "outros" ? "active" : ""}
                                onClick={() => setFilter("outros")}
                            >
                                Outros
                            </button>
                        </div>
                    </div>

                    {filteredExams.map((exam) => (
                        <button
                            className="exam-item"
                            key={exam.id}
                            onClick={() => setSelectedExam(exam)}
                        >
                            <i
                                className={
                                    exam.type === "PDF"
                                        ? "fa-solid fa-file-pdf"
                                        : "fa-solid fa-file-medical"
                                }
                            ></i>

                            <div>
                                <strong>{exam.name}</strong>
                                <p>
                                    {exam.type} • {exam.date}
                                </p>
                            </div>

                            <span className={exam.status === "Revisar" ? "warning" : ""}>
                                {exam.status}
                            </span>

                            <button
                                className="exam-delete"
                                onClick={(event) => handleDelete(event, exam.id)}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </button>
                    ))}
                </section>

                {selectedExam && (
                    <div className="exam-modal-overlay">
                        <div className="exam-modal">
                            <div className="exam-modal-header">
                                <div>
                                    <h2>{selectedExam.name}</h2>
                                    <p>
                                        {selectedExam.type} • {selectedExam.date}
                                    </p>
                                </div>

                                <button onClick={() => setSelectedExam(null)}>
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>

                            <div className="exam-modal-body">
                                <div className="exam-preview">
                                    {selectedExam.preview ? (
                                        selectedExam.type === "PDF" ? (
                                            <iframe
                                                src={selectedExam.preview}
                                                title={selectedExam.name}
                                                className="exam-preview-pdf"
                                            ></iframe>
                                        ) : selectedExam.type === "Imagem" ? (
                                            <img
                                                src={selectedExam.preview}
                                                alt={selectedExam.name}
                                                className="exam-preview-image"
                                            />
                                        ) : (
                                            <>
                                                <i className="fa-solid fa-file-medical"></i>
                                                <p>Preview indisponível para este tipo de arquivo</p>
                                            </>
                                        )
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-file-medical"></i>
                                            <p>Pré-visualização simulada do exame</p>
                                        </>
                                    )}
                                </div>

                                <div className="exam-detail">
                                    <strong>Status</strong>
                                    <span>{selectedExam.status}</span>
                                </div>

                                <div className="exam-detail">
                                    <strong>Categoria</strong>
                                    <span>{selectedExam.category}</span>
                                </div>

                                <div className="exam-notes">
                                    <strong>Observações</strong>
                                    <p>{selectedExam.notes}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Exams;