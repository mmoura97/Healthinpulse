import { useState } from "react";
import { createDemoAccount, loginPatient } from "../services/authService";
import "../styles/login.css";

function Login({ onRegister, onLogin }) {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("joao@healthinpulse.com");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    setError("");

    try {
      if (role === "doctor") {
        onLogin({
          userRole: "doctor",
          userData: {
            id: "doctor_demo",
            name: "Dr. HealthInPulse",
            email: "medico@healthinpulse.com",
          },
        });

        return;
      }

      const userData = loginPatient(email, password);

      onLogin({
        userRole: "patient",
        userData,
      });
    } catch (err) {
      setError(err.message);
    }
  }

  function handleDemo() {
    const demo = createDemoAccount();

    onLogin({
      userRole: "patient",
      userData: demo,
    });
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="brand">
          <div className="brand-icon">
            <i className="fa-solid fa-heart-pulse"></i>
          </div>

          <div>
            <h1>HealthInPulse</h1>
            <p>Monitoramento inteligente de saúde</p>
          </div>
        </div>

        <div className="hero-content">
          <span className="badge">Plataforma Inteligente</span>

          <h2>
            Monitore sua saúde
            <br />
            em tempo real
          </h2>

          <p>
            Plataforma integrada para monitoramento clínico, triagem inteligente
            e acompanhamento médico.
          </p>

          <div className="hero-cards">
            <div className="hero-card">
              <i className="fa-solid fa-heart"></i>
              <span>Monitoramento BPM</span>
            </div>

            <div className="hero-card">
              <i className="fa-solid fa-user-doctor"></i>
              <span>Dashboard Médico</span>
            </div>

            <div className="hero-card">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span>Triagem Inteligente</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <form className="login-card" onSubmit={handleLogin}>
          <div className="login-header">
            <h2>Entrar</h2>
            <p>Acesse sua conta para continuar</p>
          </div>

          <div className="role-selector">
            <button
              type="button"
              className={role === "patient" ? "role-card selected" : "role-card"}
              onClick={() => setRole("patient")}
            >
              <i className="fa-solid fa-user"></i>
              Paciente
            </button>

            <button
              type="button"
              className={role === "doctor" ? "role-card selected" : "role-card"}
              onClick={() => setRole("doctor")}
            >
              <i className="fa-solid fa-user-doctor"></i>
              Médico
            </button>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="input-group">
            <label>Email</label>

            <div className="input-wrapper">
              <i className="fa-solid fa-envelope"></i>

              <input
                type="email"
                placeholder="Digite seu email"
                value={role === "doctor" ? "medico@healthinpulse.com" : email}
                disabled={role === "doctor"}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          {role === "patient" && (
            <div className="input-group">
              <label>Senha</label>

              <div className="input-wrapper">
                <i className="fa-solid fa-lock"></i>

                <input
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
          )}

          <button className="login-button" type="submit">
            Entrar na plataforma
          </button>

          <button className="demo-button" type="button" onClick={handleDemo}>
            Usar conta demo
          </button>

          <div className="login-footer">
            <p>
              Não possui conta?
              <button type="button" onClick={onRegister}>
                Criar conta
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;