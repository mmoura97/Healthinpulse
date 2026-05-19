import { useEffect, useState } from "react";

function useHealthMetrics() {
  const [bpm, setBpm] = useState(78);

  const [steps, setSteps] = useState(8432);

  const [calories, setCalories] =
    useState(1245);

  const [status, setStatus] =
    useState("Monitorando");

  const [running, setRunning] =
    useState(false);

  const [bpmHistory, setBpmHistory] =
    useState([
      { time: "00:00", bpm: 72 },
      { time: "00:05", bpm: 76 },
      { time: "00:10", bpm: 74 },
      { time: "00:15", bpm: 78 },
    ]);

  function generateData() {
    const nextBpm = Math.floor(
      Math.random() * (112 - 62) + 62
    );

    const currentTime =
      new Date().toLocaleTimeString(
        "pt-BR",
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }
      );

    setBpm(nextBpm);

    setSteps(
      (prev) =>
        prev +
        Math.floor(Math.random() * 80)
    );

    setCalories(
      (prev) =>
        prev +
        Math.floor(Math.random() * 15)
    );

    setBpmHistory((prev) => [
      ...prev.slice(-9),
      {
        time: currentTime,
        bpm: nextBpm,
      },
    ]);

    if (nextBpm >= 105) {
      setStatus("Atenção");
    } else {
      setStatus("Monitorando");
    }
  }

  function toggleSimulation() {
    setRunning((prev) => !prev);
  }

  function simulateEmergency() {
    const currentTime =
      new Date().toLocaleTimeString(
        "pt-BR",
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }
      );

    setBpm(168);

    setStatus("PERIGO");

    setBpmHistory((prev) => [
      ...prev.slice(-9),
      {
        time: currentTime,
        bpm: 168,
      },
    ]);

    alert(
      "⚠️ Emergência simulada: frequência cardíaca crítica detectada!"
    );
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
    generateData,
    toggleSimulation,
    simulateEmergency,
  };
}

export default useHealthMetrics;