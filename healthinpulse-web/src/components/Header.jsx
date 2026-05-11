export default function Header({
  simulando,
  toggleSimulacao,
  simularEmergencia,
  gerarDadoAleatorio,
  abrirModal,
}) {
  const dataAtual = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <header className="header">
      <div>
        <h1>Dashboard de Saúde</h1>
        <p>{dataAtual}</p>
      </div>

      <div className="header-buttons">
        <button className="btn btn-white" onClick={toggleSimulacao}>
          {simulando ? 'Pausar' : 'Iniciar'}
        </button>

        <button className="btn btn-danger" onClick={simularEmergencia}>
          Emergência
        </button>

        <button className="btn btn-outline" onClick={gerarDadoAleatorio}>
          Atualizar
        </button>

        <button className="btn btn-primary" onClick={abrirModal}>
          Adicionar Dados
        </button>
      </div>
    </header>
  )
}