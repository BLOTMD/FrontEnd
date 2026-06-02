import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";
import { Service } from "../../../components/services/services";

function Login() {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function efetuarLogin() {
    setLoading(true);
    setErro("");

    try {
      const sucesso = await Service.GET<{ success?: boolean; token?: string }>(
        "efeturarLogin",
        { user, senha }
      );

      if (sucesso && (sucesso as any).success) {
        if ((sucesso as any).token) {
          localStorage.setItem("token", (sucesso as any).token);
        }
        navigate("/private");
        return;
      }

      setErro("Usuário ou senha inválidos");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErro("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.Login} id="login">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Digite seu nome de usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className={styles.input}
          id="usuario"
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className={styles.input}
          id="senha"
        />

        {erro && <p className={styles.erro}>{erro}</p>}

        <button
          onClick={efetuarLogin}
          className={styles["botao-entrar"]}
          id="entrar"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <h3>
          <input
            type="checkbox"
            id="lembrar"
            name="lembrar"
            value="Lembrar"
          />
          <label htmlFor="lembrar">Lembrar-me</label>
        </h3>

        <div>
          <a className={styles.link} onClick={() => navigate("/EsqueciSenha")}>
            Esqueci minha senha
          </a>
        </div>

        <div>
          Não é cadastrado? <a href="#">Cadastrar</a>
        </div>
      </div>
    </div>
  );
}

export default Login;