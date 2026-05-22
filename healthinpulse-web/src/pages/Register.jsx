import { useState } from "react";

import { createAccount } from "../services/authService";

import "../styles/register.css";

function Register({ onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!name || !email || !password) {
      setError("Preencha todos os campos.");

      return;
    }

    if (password.length < 6) {
      setError("A senha precisa ter ao menos 6 caracteres.");

      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");

      return;
    }

    try {
      createAccount({
        name,
        email,
        password,
      });

      setSuccess(true);

      setTimeout(() => {
        onBack();
      }, 1800);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <div className="register-logo">
            <i className="fa-solid fa-heart-pulse"></i>
          </div>

          <h1>Criar conta</h1>

          <p>
            Cadastre-se para acessar a plataforma clínica HealthInPulse
          </p>
        </div>

        {success ? (
          <div className="register-success">
            <i className="fa-solid fa-circle-check"></i>

            <h2>Conta criada com sucesso</h2>

            <p>Redirecionando para o login...</p>
          </div>
        ) : (
          <form className="register-form" onSubmit={handleSubmit}>
            {error && <div className="register-error">{error}</div>}

            <div className="register-group">
              <label>Nome completo</label>

              <div className="register-input">
                <i className="fa-solid fa-user"></i>

                <input
                  type="text"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>

            <div className="register-group">
              <label>Email</label>

              <div className="register-input">
                <i className="fa-solid fa-envelope"></i>

                <input
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div className="register-group">
              <label>Senha</label>

              <div className="register-input">
                <i className="fa-solid fa-lock"></i>

                <input
                  type="password"
                  placeholder="Crie uma senha"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>

            <div className="register-group">
              <label>Confirmar senha</label>

              <div className="register-input">
                <i className="fa-solid fa-shield"></i>

                <input
                  type="password"
                  placeholder="Repita sua senha"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            </div>

            <button className="register-button" type="submit">
              Criar conta
            </button>

            <button type="button" className="register-back" onClick={onBack}>
              Voltar ao login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;