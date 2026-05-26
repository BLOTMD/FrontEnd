import styles from './Login.module.css'
import { useState } from 'react';


function Login() 
    {
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
}
    
    function getUser(input: HTMLInputElement) {
        setUser(input.value);
    }
    
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
                            className={styles.input} id="usuario" />

                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className={styles.input}
                            id="senha"
                        />

                        {erro && <p className={styles.erro}>{erro}</p>}

                        <button onClick={entrar} className={styles['botao-entrar']} id="entrar">Entrar</button>

                        <h3><input type="checkbox" id="lembrar" name="lembrar" value="Lembrar" />
                        <label htmlFor="lembrar">Lembrar-me</label></h3>

                        <div><a href="#">Esqueci minha senha</a></div>

                        <div>Não é cadastrado? <a href="#">Cadastrar</a></div>
                </div>
            </div>

        </>
    )
}

export default Login
