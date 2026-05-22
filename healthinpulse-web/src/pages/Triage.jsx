import { useState } from "react";

import Sidebar from "../components/Sidebar";
import MobileMenuButton from "../components/MobileMenuButton";

import "../styles/triage.css";

const questions = [
    "Você sentiu falta de ar nas últimas 24 horas?",

    "Teve dor ou pressão no peito recentemente?",

    "Sentiu tontura, desmaio ou fraqueza súbita?",

    "Percebeu batimentos muito acelerados em repouso?",

    "Teve febre alta recentemente?",

    "Possui histórico cardíaco familiar?",
];

function Triage({ onNavigate, onLogout }) {
    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    const [step, setStep] = useState(0);

    const [score, setScore] = useState(0);

    const [answers, setAnswers] = useState([]);

    function answer(value, text) {
        setAnswers((prev) => [
            ...prev,
            {
                question: questions[step],
                answer: text,
            },
        ]);

        setScore((prev) => prev + value);

        if (step < questions.length - 1) {
            setStep((prev) => prev + 1);
        }
    }

    const finished =
        step === questions.length - 1;

    const risk =
        score >= 8
            ? "Alto"
            : score >= 4
                ? "Moderado"
                : "Baixo";

    return (
        <div className="dashboard-layout">
            <Sidebar
                currentScreen="triage"
                onNavigate={onNavigate}
                onLogout={onLogout}
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />

            <main className="dashboard-main">
                <MobileMenuButton
                    onClick={() =>
                        setSidebarOpen(true)
                    }
                />

                <header className="triage-header">
                    <div>
                        <h1>
                            Triagem Inteligente
                        </h1>

                        <p>
                            Avaliação clínica
                            inicial baseada em
                            sintomas e fatores de
                            risco
                        </p>
                    </div>
                </header>

                <main className="triage-card">
                    <div className="triage-progress">
                        <div
                            style={{
                                width: `${((step + 1) /
                                        questions.length) *
                                    100
                                    }%`,
                            }}
                        />
                    </div>

                    {!finished ? (
                        <>
                            <span>
                                Pergunta {step + 1}{" "}
                                de{" "}
                                {
                                    questions.length
                                }
                            </span>

                            <h2>
                                {questions[step]}
                            </h2>

                            <div className="triage-buttons">
                                <button
                                    onClick={() =>
                                        answer(0, "Não")
                                    }
                                >
                                    Não
                                </button>

                                <button
                                    onClick={() =>
                                        answer(2, "Sim")
                                    }
                                >
                                    Sim
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <span>
                                Resultado preliminar
                            </span>

                            <h2>
                                Risco {risk}
                            </h2>

                            <p>
                                Esta triagem é uma
                                simulação clínica
                                inicial e não
                                substitui avaliação
                                médica profissional.
                            </p>

                            <div className="triage-result">
                                <strong>
                                    Respostas
                                </strong>

                                {answers.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <div
                                            key={index}
                                            className="triage-answer"
                                        >
                                            <span>
                                                {
                                                    item.question
                                                }
                                            </span>

                                            <strong>
                                                {
                                                    item.answer
                                                }
                                            </strong>
                                        </div>
                                    )
                                )}
                            </div>

                            <button
                                className="triage-finish"
                                onClick={() =>
                                    onNavigate(
                                        "dashboard"
                                    )
                                }
                            >
                                Voltar ao Dashboard
                            </button>
                        </>
                    )}
                </main>
            </main>
        </div>
    );
}

export default Triage;