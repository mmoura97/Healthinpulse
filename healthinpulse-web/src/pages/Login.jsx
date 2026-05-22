import { useEffect, useState } from "react";
import {
  createDemoAccount,
  deleteAccount,
  getAccounts,
  loginPatient,
} from "../services/authService";

import "../styles/login.css";

function getInitials(name) {
  return name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Login({ onRegister, onLogin }) {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("joao@healthinpulse.com");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  useEffect(() => {
    const storedAccounts = getAccounts();

    setAccounts(storedAccounts);

    if (storedAccounts.length > 0) {
      const first = storedAccounts[0];

      setSelectedAccountId(first.id);
      setEmail(first.email);
      setPassword(first.password || "");
    }
  }, []);

  function selectAccount(account) {
    setSelectedAccountId(account.id);
    setEmail(account.email);
    setPassword(account.password || "");
    setRole(account.role || "patient");
    setError("");
  }

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
    const updatedAccounts = getAccounts();

    setAccounts(updatedAccounts);
    selectAccount(demo);

    onLogin({
      userRole: "patient",
      userData: demo,
    });
  }

  function handleDeleteAccount(event, accountId) {
    event.stopPropagation();

    const updated = deleteAccount(accountId);

    setAccounts(updated);

    if (selectedAccountId === accountId) {
      setSelectedAccountId(null);
      setEmail("");
      setPassword("");
    }
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

          {accounts.length > 0 && (
            <div className="saved-accounts">
              <div className="saved-accounts-title">Contas salvas</div>

              {accounts.map((account) => (
                <button
                  type="button"
                  key={account.id}
                  className={
                    selectedAccountId === account.id
                      ? "saved-account selected"
                      : "saved-account"
                  }
                  onClick={() => selectAccount(account)}
                >
                  <div className="saved-account-avatar">
                    {getInitials(account.name)}
                  </div>

                  <div className="saved-account-info">
                    <strong>{account.name}</strong>
                    <span>{account.email}</span>
                  </div>

                  <button
                    type="button"
                    className="saved-account-delete"
                    onClick={(event) => handleDeleteAccount(event, account.id)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </button>
              ))}
            </div>
          )}

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