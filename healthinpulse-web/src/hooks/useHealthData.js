import { useEffect, useState } from 'react'

export default function useHealthData() {
  const [bpm, setBpm] = useState(75)
  const [passos, setPassos] = useState(1200)
  const [calorias, setCalorias] = useState(240)
  const [status, setStatus] = useState('Monitorando')
  const [simulando, setSimulando] = useState(false)
  const [historicoBpm, setHistoricoBpm] = useState([70, 72, 75, 73])

  useEffect(() => {
    let interval

    if (simulando) {
      interval = setInterval(() => {
        gerarDadoAleatorio()
      }, 3000)
    }

    return () => clearInterval(interval)
  }, [simulando])

  function gerarDadoAleatorio() {
    const novoBpm = Math.floor(Math.random() * (110 - 60) + 60)

    setBpm(novoBpm)
    setPassos((prev) => prev + Math.floor(Math.random() * 60))
    setCalorias((prev) => prev + Math.floor(Math.random() * 12))

    setHistoricoBpm((prev) => [...prev.slice(-6), novoBpm])

    if (novoBpm >= 140) {
      setStatus('PERIGO')
    } else {
      setStatus('Monitorando')
    }
  }

  function toggleSimulacao() {
    setSimulando((prev) => !prev)
  }

  function simularEmergencia() {
    setBpm(170)
    setStatus('PERIGO')

    setHistoricoBpm((prev) => [...prev.slice(-6), 170])

    alert('⚠️ Emergência detectada!')
  }

  return {
    bpm,
    passos,
    calorias,
    status,
    simulando,
    historicoBpm,
    gerarDadoAleatorio,
    toggleSimulacao,
    simularEmergencia,
  }
}