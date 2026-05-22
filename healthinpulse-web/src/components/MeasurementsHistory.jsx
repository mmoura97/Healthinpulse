function MeasurementsHistory({ measurements }) {
    return (
        <section className="history-card">
            <div className="history-header">
                <div>
                    <h3>Últimas medições</h3>
                    <p>Histórico recente de dados monitorados</p>
                </div>

                <span>{measurements.length} registros</span>
            </div>

            <div className="history-list">
                {measurements.map((item) => (
                    <div className="history-item" key={item.id}>
                        <div className="history-time">
                            <i className="fa-solid fa-clock"></i>
                            {item.time}
                        </div>

                        <div className="history-metric">
                            <strong>{item.bpm}</strong>
                            <span>BPM</span>
                        </div>

                        <div className="history-metric">
                            <strong>{item.steps.toLocaleString("pt-BR")}</strong>
                            <span>passos</span>
                        </div>

                        <div className="history-metric">
                            <strong>{item.calories.toLocaleString("pt-BR")}</strong>
                            <span>kcal</span>
                        </div>

                        <span
                            className={
                                item.status === "PERIGO"
                                    ? "history-status danger"
                                    : item.status === "Atenção"
                                        ? "history-status warning"
                                        : "history-status safe"
                            }
                        >
                            {item.status}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default MeasurementsHistory;