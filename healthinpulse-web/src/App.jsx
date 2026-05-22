import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Exams from "./pages/Exams";
import Triage from "./pages/Triage";
import PatientDetails from "./pages/PatientDetails";

function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("patient");
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  function handleLogin({ userData, userRole }) {
    setUser(userData);
    setRole(userRole);

    if (userRole === "doctor") {
      setScreen("doctor");
      return;
    }

    setScreen("dashboard");
  }

  function handleLogout() {
    setUser(null);
    setRole("patient");
    setSelectedPatientId(null);
    setScreen("login");
  }

  function openPatientDetails(patientId) {
    setSelectedPatientId(patientId);
    setScreen("patient-details");
  }

  if (screen === "register") {
    return <Register onBack={() => setScreen("login")} />;
  }

  if (screen === "doctor") {
    return (
      <DoctorDashboard
        user={user}
        onNavigate={setScreen}
        onLogout={handleLogout}
        onOpenPatient={openPatientDetails}
      />
    );
  }

  if (screen === "exams") {
    return (
      <Exams
        user={user}
        role={role}
        onNavigate={setScreen}
        onLogout={handleLogout}
      />
    );
  }

  if (screen === "triage") {
    return (
      <Triage
        user={user}
        role={role}
        onNavigate={setScreen}
        onLogout={handleLogout}
      />
    );
  }

  if (screen === "patient-details") {
    return (
      <PatientDetails
        patientId={selectedPatientId}
        user={user}
        onNavigate={setScreen}
        onLogout={handleLogout}
      />
    );
  }

  if (screen === "dashboard") {
    return (
      <Dashboard
        user={user}
        role={role}
        onNavigate={setScreen}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <Login
      onRegister={() => setScreen("register")}
      onLogin={handleLogin}
    />
  );
}

export default App;