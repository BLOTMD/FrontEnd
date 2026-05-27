import { useNavigate } from "react-router-dom";
import styles from "../forgetpassword.module.css";
import { useState } from "react";

function EsqueciSenha() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  function enviarCodigo() {

    if (email.trim() === "") {
      setMensagem("Digite seu email");
      return;
    }

    setMensagem("Código enviado para o email!");
  }

  return (
    <>
      <div className={styles.body}>

        <div className={styles.Login}>

          <h2 className={styles.h}>
            Recuperar Senha
          </h2>

          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />

          {mensagem && (
            <p className={styles.erro}>
              {mensagem}
            </p>
          )}

          <button
            onClick={enviarCodigo}
            className={styles["botao-entrar"]}
          >
            Enviar Código
          </button>

          <div style={{ marginTop: "15px" }}>

            <a
              className={styles.link}
              onClick={() => navigate("/")}
            >
              Voltar para login
            </a>

          </div>

        </div>
      </div>
    </>
  );
}

export default EsqueciSenha;