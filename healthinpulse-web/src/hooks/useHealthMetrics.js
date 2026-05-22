import { useEffect, useState } from "react";

function getCurrentTime() {
  return new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function useHealthMetrics() {
  const [bpm, setBpm] = useState(78);
  const [steps, setSteps] = useState(8432);
  const [calories, setCalories] = useState(245);
  const [status, setStatus] = useState("Monitorando");
  const [running, setRunning] = useState(false);

  const [bpmHistory, setBpmHistory] = useState([
    { time: "00:00", bpm: 72 },
    { time: "00:05", bpm: 76 },
    { time: "00:10", bpm: 74 },
    { time: "00:15", bpm: 78 },
  ]);

  const [caloriesHistory, setCaloriesHistory] = useState([
    { time: "00:00", calories: 80 },
    { time: "00:05", calories: 120 },
    { time: "00:10", calories: 180 },
    { time: "00:15", calories: 245 },
  ]);

  const [measurements, setMeasurements] = useState([
    {
      id: 1,
      time: "00:15",
      bpm: 78,
      steps: 8432,
      calories: 245,
      status: "Monitorando",
    },
  ]);

  const goals = {
    calories: {
      current: calories,
      target: 400,
      percent: Math.min(Math.round((calories / 400) * 100), 100),
    },
    bpm: {
      current: bpm,
      target: 150,
      percent: Math.min(Math.round((bpm / 150) * 100), 100),
    },
    steps: {
      current: steps,
      target: 10000,
      percent: Math.min(Math.round((steps / 10000) * 100), 100),
    },
  };

  function resolveStatus(nextBpm) {
    if (nextBpm >= 140) return "PERIGO";
    if (nextBpm >= 105) return "Atenção";
    return "Monitorando";
  }

  function updateMetrics(nextBpm, addSteps = 0, addCalories = 0) {
    const currentTime = getCurrentTime();
    const nextStatus = resolveStatus(nextBpm);

    setBpm(nextBpm);
    setStatus(nextStatus);

    setSteps((prevSteps) => {
      const nextSteps = prevSteps + Number(addSteps);

      setCalories((prevCalories) => {
        const nextCalories = prevCalories + Number(addCalories);

        setMeasurements((prev) => [
          {
            id: Date.now(),
            time: currentTime,
            bpm: nextBpm,
            steps: nextSteps,
            calories: nextCalories,
            status: nextStatus,
          },
          ...prev.slice(0, 7),
        ]);

        setCaloriesHistory((history) => [
          ...history.slice(-9),
          {
            time: currentTime,
            calories: nextCalories,
          },
        ]);

        return nextCalories;
      });

      return nextSteps;
    });

    setBpmHistory((prev) => [
      ...prev.slice(-9),
      {
        time: currentTime,
        bpm: nextBpm,
      },
    ]);
  }

  function generateData() {
    const nextBpm = Math.floor(Math.random() * (112 - 62) + 62);
    const nextSteps = Math.floor(Math.random() * 80);
    const nextCalories = Math.floor(Math.random() * 15);

    updateMetrics(nextBpm, nextSteps, nextCalories);
  }

  function toggleSimulation() {
    setRunning((prev) => !prev);
  }

  function simulateEmergency() {
    updateMetrics(168, 0, 0);
    alert("⚠️ Emergência simulada: frequência cardíaca crítica detectada!");
  }

  function addManualData({ manualBpm, manualSteps, manualCalories }) {
    const safeBpm = Number(manualBpm) || bpm;
    const safeSteps = Number(manualSteps) || 0;
    const safeCalories = Number(manualCalories) || 0;

    updateMetrics(safeBpm, safeSteps, safeCalories);
  }

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      generateData();
    }, 2500);

    return () => clearInterval(interval);
  }, [running]);

  return {
    bpm,
    steps,
    calories,
    status,
    running,
    bpmHistory,
    caloriesHistory,
    measurements,
    goals,
    generateData,
    toggleSimulation,
    simulateEmergency,
    addManualData,
  };
}

export default useHealthMetrics;