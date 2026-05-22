function Sidebar({ currentScreen, onNavigate, onLogout, isOpen, onClose }) {
  function handleNavigate(screen) {
    onNavigate(screen);
    if (onClose) onClose();
  }

  return (
    <>
      <div
        className={isOpen ? "sidebar-overlay open" : "sidebar-overlay"}
        onClick={onClose}
      ></div>

      <aside className={isOpen ? "sidebar sidebar-open" : "sidebar"}>
        <div className="sidebar-brand">
          <i className="fa-solid fa-heart-pulse"></i>
          <span>HealthInPulse</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={currentScreen === "dashboard" ? "nav-item active" : "nav-item"}
            onClick={() => handleNavigate("dashboard")}
          >
            <i className="fa-solid fa-chart-line"></i>
            Dashboard
          </button>

          <button
            className={currentScreen === "triage" ? "nav-item active" : "nav-item"}
            onClick={() => handleNavigate("triage")}
          >
            <i className="fa-solid fa-stethoscope"></i>
            Triagem
          </button>

          <button
            className={currentScreen === "exams" ? "nav-item active" : "nav-item"}
            onClick={() => handleNavigate("exams")}
          >
            <i className="fa-solid fa-file-waveform"></i>
            Exames
          </button>

          <button
            className={currentScreen === "doctor" ? "nav-item active" : "nav-item"}
            onClick={() => handleNavigate("doctor")}
          >
            <i className="fa-solid fa-user-doctor"></i>
            Médico
          </button>

          <button className="nav-item logout" onClick={onLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            Sair
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;