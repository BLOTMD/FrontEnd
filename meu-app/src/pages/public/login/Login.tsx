import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";
import { Service } from "../../../components/services/services";
import type { LoginInterface } from "../../../interfaces/login.ts";
import Button from "../../../component/button/Button";

type LoginResposta = {
  sucesso: boolean;
  mensagem: string;
  token: string;
};

function Login() {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function efetuarLogin() {
    if (!user.trim() || !senha.trim()) {
      setErro("Preencha usuário e senha");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const parametros: LoginInterface = {
        user,
        senha,
      };

      const resposta: LoginResposta = await Service.POST<LoginInterface, LoginResposta>("efetuarLogin", parametros);

      localStorage.setItem("token", resposta.token);

      if (resposta.sucesso) {
        navigate("/loja");
        return;
      }

      setErro(resposta.mensagem || "Usuário ou senha inválidos");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErro(error instanceof Error ? error.message : "Erro ao conectar com o servidor");
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
          placeholder="Digite seu nome de usuário"
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

        <Button Click={efetuarLogin} texto={loading ? "Entrando..." : "Entrar"} />

        <h3>
          <input type="checkbox" id="lembrar" name="lembrar" value="Lembrar" />
          <label htmlFor="lembrar">Lembrar-me</label>
        </h3>

        <div>
          <a className={styles.link} onClick={() => navigate("/EsqueciSenha")}>
            Esqueci minha senha
          </a>
        </div>

        <div>
          Não é cadastrado?{" "}
          <a className={styles.link} onClick={() => navigate("/cadastro")}>
            Cadastrar
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
