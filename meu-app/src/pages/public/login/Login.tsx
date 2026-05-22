import styles from './Login.module.css'
import { useState } from 'react';


function Login() 
    {
    const [user, setUser] = useState("user1234");

    function exibeUser() {
        console.log(user);
    }
    
    function getUser(input: HTMLInputElement) {
        setUser(input.value);
    }

    return (
        <>

            <div className={styles.body}>

                <div className={styles.Login} id="login">

                    <h2>Login</h2>

                        <input type="username" placeholder="Digite seu nome de usuario" value={user} onChange={(x) => getUser(x.target)} 
                        className={styles.input} id="usuario" />

                        <input type="password" placeholder="Digite sua senha" className={styles.input} id="senha" />

                        <button onClick={exibeUser} className={styles['botao-entrar']} id="entrar">Entrar</button>


                        <div><a href="#">Esqueci minha senha</a></div>

                        <div>Não é cadastrado? <a href="#">Cadastrar</a></div>
                </div>
            </div>

        </>
    )
}

export default Login
