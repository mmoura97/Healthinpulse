function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <i className="fa-solid fa-heart-pulse"></i>
        <span>HealthInPulse</span>
      </div>

      <nav className="sidebar-nav">
        <button className="nav-item active">
          <i className="fa-solid fa-chart-line"></i>
          Dashboard
        </button>

        <button className="nav-item">
          <i className="fa-solid fa-heart-pulse"></i>
          Saúde
        </button>

        <button className="nav-item">
          <i className="fa-solid fa-file-waveform"></i>
          Exames
        </button>

        <button className="nav-item">
          <i className="fa-solid fa-user-doctor"></i>
          Médico
        </button>

        <button className="nav-item">
          <i className="fa-solid fa-gear"></i>
          Configurações
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;