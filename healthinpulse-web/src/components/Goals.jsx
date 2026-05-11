export default function Goals({ passos }) {
  const progresso = Math.min((passos / 10000) * 100, 100)

  return (
    <div className="goals-card">
      <h3>Meta diária de passos</h3>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progresso}%` }}
        ></div>
      </div>

      <p>{passos} / 10.000 passos</p>
    </div>
  )
}