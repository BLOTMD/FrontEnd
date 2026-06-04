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
<<<<<<< HEAD

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
=======
      const sucesso = await Service.POST("efetuarLogin", { user, senha });

      setLoading(false);

      if (sucesso != null) {
        navigate("/Home");
        return;
      }

      setErro("Usuário ou senha inválidos");
      

>>>>>>> 4957e691dcf9968b671cc51bf959220729c6e3fb
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErro("Erro ao conectar com o servidor");
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
<<<<<<< HEAD
          <input type="checkbox" id="lembrar" />
=======
          <input type="checkbox" id="lembrar" name="lembrar" value="Lembrar" />
>>>>>>> 4957e691dcf9968b671cc51bf959220729c6e3fb
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
