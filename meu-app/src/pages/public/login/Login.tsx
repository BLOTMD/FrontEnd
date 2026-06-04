import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";
import { Service } from "../../../components/services/services";
import type { LoginInterface } from "../../../interfaces/login";
import type { RetornoInterface } from "../../../interfaces/Retorno";

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

      const parametros:LoginInterface = {
        "login": user,
        "senha": senha
      };
      const respostaDoServidor:RetornoInterface = await Service.POST("efetuarLogin", parametros);
        
      console.log(respostaDoServidor);

      if (respostaDoServidor) {
        console.log("Login realizado com sucesso");
        navigate("/Home");
      } else {
        setErro("Usuário ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErro("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.Login}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Digite seu usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className={styles.input}
        />

        {erro && <p className={styles.erro}>{erro}</p>}

        <button
          onClick={efetuarLogin}
          className={styles["botao-entrar"]}
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <h3>
          <input type="checkbox" id="lembrar" />
          <label htmlFor="lembrar">Lembrar-me</label>
        </h3>

        <div>
          <a
            className={styles.link}
            onClick={() => navigate("/EsqueciSenha")}
          >
            Esqueci minha senha
          </a>
        </div>

        <div>
          Não é cadastrado?{" "}
          <a
            className={styles.link}
            onClick={() => navigate("/Cadastro")}
          >
            Cadastrar
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;