function GoalCard({ title, subtitle, current, target, percent, icon }) {
    return (
        <div className="goal-card">
            <div className="goal-header">
                <div>
                    <h4>{title}</h4>
                    <p>{subtitle}</p>
                </div>

                <div className="goal-icon">
                    <i className={icon}></i>
                </div>
            </div>

            <div className="goal-progress-bg">
                <div
                    className="goal-progress-fill"
                    style={{ width: `${percent}%` }}
                ></div>
            </div>

            <span className="goal-stats">
                {current.toLocaleString("pt-BR")} / {target.toLocaleString("pt-BR")} (
                {percent}%)
            </span>
        </div>
    );
}

function GoalsSection({ goals }) {
    return (
        <section className="goals-grid">
            <GoalCard
                title="Queimar 400 calorias por dia"
                subtitle="Meta: 400 kcal"
                current={goals.calories.current}
                target={goals.calories.target}
                percent={goals.calories.percent}
                icon="fa-solid fa-fire"
            />

            <GoalCard
                title="Manter frequência cardíaca saudável"
                subtitle="Meta: até 150 BPM"
                current={goals.bpm.current}
                target={goals.bpm.target}
                percent={goals.bpm.percent}
                icon="fa-solid fa-heart-pulse"
            />

            <GoalCard
                title="Caminhar 10.000 passos diários"
                subtitle="Meta: 10.000 passos"
                current={goals.steps.current}
                target={goals.steps.target}
                percent={goals.steps.percent}
                icon="fa-solid fa-shoe-prints"
            />
        </section>
    );
}

export default GoalsSection;