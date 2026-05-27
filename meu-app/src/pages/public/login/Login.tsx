<<<<<<< HEAD
import styles from './Login.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() 

    {
    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
=======
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";

function Login() {

  const Navigate = useNavigate();
>>>>>>> 47dad46b184a97dca7bee4e62e19e63289551479

  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function entrar() {
    
    if (user !== "user1234" || senha !== "1234") {
      setErro("Usuário ou senha inválidos");
      return;
    }

    setErro("");
    console.log("Login correto");
<<<<<<< HEAD
}
const navigation = useNavigate();
    
    return (
        <>
=======
  }
>>>>>>> 47dad46b184a97dca7bee4e62e19e63289551479

  return (
    <>
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
            onClick={entrar}
            className={styles["botao-entrar"]}
            id="entrar"
          >
            Entrar
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
            <a className={styles.link} onClick={() => Navigate("/EsqueciSenha")}>
              Esqueci minha senha
            </a>
          </div>

<<<<<<< HEAD
                        <h3><input type="checkbox" id="lembrar" name="lembrar" value="Lembrar" />
                        <label htmlFor="lembrar">Lembrar-me</label></h3>

                        <div><a href="#">Esqueci minha senha</a></div>

                        <div>Não é cadastrado?</div> <div><a href="#">Cadastrar</a></div>
                </div>
            </div>

        </>
    )
=======
          <div>
            Não é cadastrado? <a className={styles.link} onClick={() => Navigate("/Cadastro")}>
              Cadastrar
            </a>
          </div>
        </div>
      </div>
    </>
  );
>>>>>>> 47dad46b184a97dca7bee4e62e19e63289551479
}

export default Login;
