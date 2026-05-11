export default function Card({ title, value, unit, icon, color }) {
  return (
    <div className="card summary-card">
      <div>
        <h3>{title}</h3>

        <div className="card-value">
          {value}
          <span>{unit}</span>
        </div>
      </div>

      <div className={`icon-box ${color}`}>
        <i className={icon}></i>
      </div>
    </div>
  )
}