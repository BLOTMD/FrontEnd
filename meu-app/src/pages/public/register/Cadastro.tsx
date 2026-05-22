import style from "./Cadastro.module.css";

function Cadastro() {
  return (
    <>

    <div className={style.body}>
      <div className={style.cadastrar}>
        <h2> Cadastro </h2>

        <input type="text" placeholder="Nome Completo" className={style.input} id="Nome" />
        <input type="email" placeholder="Email" className={style.input} id="Email" />
        <input type="password" placeholder="Senha" className={style.input} id="Senha" />
        <input type="password" placeholder="Confirmar Senha" className={style.input} id="ConfirmarSenha" />
        <input type="date" placeholder="Data de Nascimento" className={style.input} id="DataNascimento" />
        <input type="number" placeholder="Telefone" className={style.input} id="Telefone" />
        <input type="checkbox" placeholder="Gênero" className={style.input} id="Genero" /> Masculino
        <input type="checkbox" placeholder="Gênero" className={style.input} id="Genero" /> Feminino
        <input type="checkbox" placeholder="Gênero" className={style.input} id="Genero" /> Abacaxí
        <input type="checkbox" placeholder="Termos de Uso" className={style.input} id="TermosdeUso" /> Aceito os <a href="#/termos de uso">Termos de Uso</a>

        <button className={style.button}> Cadastrar </button>

        <div className={style.login}>Já tem uma conta? <a href="#/login">Fazer Login</a></div>
        
      </div>
    </div>
    </>
  );
}

export default Cadastro;
