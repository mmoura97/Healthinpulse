import { useState } from 'react'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Card from '../components/Card'
import Charts from '../components/Charts'
import Goals from '../components/Goals'
import Modal from '../components/Modal'

import useHealthData from '../hooks/useHealthData'

export default function Dashboard() {
  const data = useHealthData()

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">
        <Header
          simulando={data.simulando}
          toggleSimulacao={data.toggleSimulacao}
          simularEmergencia={data.simularEmergencia}
          gerarDadoAleatorio={data.gerarDadoAleatorio}
          abrirModal={() => setModalOpen(true)}
        />

        <div className="dashboard-grid">
          <Card
            title="BPM"
            value={data.bpm}
            unit="BPM"
            icon="fa-solid fa-heart-pulse"
            color="icon-red"
          />

          <Card
            title="Passos"
            value={data.passos}
            unit="passos"
            icon="fa-solid fa-shoe-prints"
            color="icon-blue"
          />

          <Card
            title="Calorias"
            value={data.calorias}
            unit="kcal"
            icon="fa-solid fa-fire"
            color="icon-orange"
          />

          <Card
            title="Status"
            value={data.status}
            unit=""
            icon="fa-solid fa-triangle-exclamation"
            color="icon-green"
          />
        </div>

        <Charts historicoBpm={data.historicoBpm} />

        <Goals passos={data.passos} />

        <Modal
          open={modalOpen}
          fecharModal={() => setModalOpen(false)}
        />
      </main>
    </div>
  )
}