import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("patient");

  function handleLogin({ userData, userRole }) {
    setUser(userData);
    setRole(userRole);
    setScreen("dashboard");
  }

  if (screen === "register") {
    return <Register onBack={() => setScreen("login")} />;
  }

  if (screen === "dashboard") {
    return <Dashboard user={user} role={role} />;
  }

  return (
    <Login
      onRegister={() => setScreen("register")}
      onLogin={handleLogin}
    />
  );
}

export default App;