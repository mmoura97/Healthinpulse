import { useState } from "react";
import { createAccount } from "../services/authService";
import "../styles/login.css";
import "../styles/register.css";

function Register({ onBack }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Preencha todos os campos.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      createAccount({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      onBack();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="register-page">
      <section className="register-left">
        <div className="brand">
          <div className="brand-icon">
            <i className="fa-solid fa-heart-pulse"></i>
          </div>

          <div>
            <h1>HealthInPulse</h1>
            <p>Plataforma de Saúde Inteligente</p>
          </div>
        </div>

        <div className="register-hero">
          <h2>Crie sua conta e monitore sua saúde.</h2>
          <p>
            Configure seu perfil para acompanhar métricas, exames e metas de
            saúde com precisão clínica.
          </p>
        </div>
      </section>

      <section className="register-right">
        <form className="register-card" onSubmit={handleSubmit}>
          <h2>Criar nova conta</h2>
          <p>Preencha os dados do seu perfil</p>

          {error && <div className="form-error">{error}</div>}

          <input
            name="name"
            placeholder="Nome completo"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirmar senha"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit">Criar conta</button>

          <button type="button" className="back-button" onClick={onBack}>
            Já possui conta? <strong>Entrar</strong>
          </button>
        </form>
      </section>
    </div>
  );
}

export default Register;