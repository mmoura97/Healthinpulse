export default function Header() {
const dataAtual = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
});

return (
    <header className="header">
    <div>
        <h1>Bem-vindo ao Healthinpulse</h1>
        <p>{dataAtual}</p>
    </div>

    <div className="header-buttons">
        <button className="btn btn-white">
        <i className="fa-solid fa-play"></i> Iniciar
        </button>

        <button className="btn btn-red">
        <i className="fa-solid fa-triangle-exclamation"></i> Simular Emergência
        </button>

        <button className="btn btn-white">
        <i className="fa-solid fa-plus"></i> Adicionar Dados
        </button>

        <button className="btn btn-outline">
        <i className="fa-solid fa-rotate"></i> Atualizar
        </button>
    </div>
    </header>
);
}