import { useState } from "react";

function AddDataModal({ open, onClose, onSave }) {
    const [form, setForm] = useState({
        manualBpm: "",
        manualSteps: "",
        manualCalories: "",
    });

    if (!open) return null;

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        onSave(form);

        setForm({
            manualBpm: "",
            manualSteps: "",
            manualCalories: "",
        });

        onClose();
    }

    return (
        <div className="modal-overlay">
            <form className="data-modal" onSubmit={handleSubmit}>
                <div className="modal-header">
                    <div>
                        <h2>Adicionar dados</h2>
                        <p>Insira uma medição manual para atualizar o painel.</p>
                    </div>

                    <button type="button" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <label>
                    Frequência cardíaca (BPM)
                    <input
                        name="manualBpm"
                        type="number"
                        placeholder="Ex: 82"
                        value={form.manualBpm}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Passos caminhados
                    <input
                        name="manualSteps"
                        type="number"
                        placeholder="Ex: 500"
                        value={form.manualSteps}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Calorias queimadas
                    <input
                        name="manualCalories"
                        type="number"
                        placeholder="Ex: 120"
                        value={form.manualCalories}
                        onChange={handleChange}
                    />
                </label>

                <div className="modal-actions">
                    <button type="button" className="ghost" onClick={onClose}>
                        Cancelar
                    </button>

                    <button type="submit" className="primary">
                        Salvar dados
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddDataModal;