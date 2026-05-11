export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <i className="fa-solid fa-heart-pulse"></i>
        <div>
          <h2>HealthInPulse</h2>
          <span>Monitoramento inteligente</span>
        </div>
      </div>

      <nav>
        <ul className="nav-links">
          <li className="active">
            <i className="fa-solid fa-chart-line"></i>
            Dashboard
          </li>

          <li>
            <i className="fa-solid fa-heart"></i>
            Saúde
          </li>

          <li>
            <i className="fa-solid fa-clock"></i>
            Histórico
          </li>

          <li>
            <i className="fa-solid fa-gear"></i>
            Configurações
          </li>
        </ul>
      </nav>
    </aside>
  )
}