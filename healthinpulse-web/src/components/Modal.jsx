export default function Modal({ open, fecharModal }) {
  if (!open) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Adicionar Dados</h2>

        <input type="text" placeholder="Digite um valor" />

        <div className="modal-buttons">
          <button className="btn btn-primary">Salvar</button>

          <button className="btn btn-danger" onClick={fecharModal}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}