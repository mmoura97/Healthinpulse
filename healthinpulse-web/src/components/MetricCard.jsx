function MetricCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="metric-card">
      <div
        className="metric-icon"
        style={{ background: color }}
      >
        <i className={icon}></i>
      </div>

      <div>
        <span>{title}</span>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default MetricCard;