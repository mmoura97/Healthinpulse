function Header({ user }) {
  return (
    <header className="dashboard-header">
      <div>
        <h1>Olá, {user?.name}</h1>
        <p>Monitoramento inteligente em tempo real</p>
      </div>

      <div className="header-profile">
        <div className="profile-avatar">
          {user?.name?.charAt(0)}
        </div>
      </div>
    </header>
  );
}

export default Header;