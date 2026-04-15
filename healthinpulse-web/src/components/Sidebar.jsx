export default function Sidebar() {
return (
    <aside className="sidebar">
    <div className="logo">
        <i className="fa-solid fa-heart-pulse"></i>
        <div>
        Healthinpulse
        <span>Monitore sua saúde</span>
        </div>
    </div>

    <p className="nav-section">NAVEGAÇÃO</p>

    <ul className="nav-links">
        <li className="active">
        <i className="fa-solid fa-chart-line"></i> Dashboard
        </li>
        <li>
        <i className="fa-solid fa-plus"></i> Adicionar Dados
        </li>
        <li>
        <i className="fa-solid fa-clock-rotate-left"></i> Histórico
        </li>
        <li>
        <i className="fa-solid fa-bullseye"></i> Metas de Saúde
        </li>
        <li>
        <i className="fa-solid fa-gear"></i> Configurações
        </li>
    </ul>

    <div className="status-pulseira">
        <p>
        <i className="fa-solid fa-circle"></i> Conectado
        </p>
        <span>Pulseira sincronizada</span>
    </div>
    </aside>
);
}