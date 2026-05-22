import { useState } from "react";
import style from "./Cadastro.module.css";

function Cadastro() {
  const [Nome, setNome] = useState("Gabriel");
  const [Email, setEmail] = useState("test@test.com");
  const [Senha, setSenha] = useState("12345678");
  const [ConfirmarSenha, setConfirmarSenha] = useState("12345678");
  const [DataNascimento, setDataNascimento] = useState("15/10/2000");
  const [Telefone, setTelefone] = useState("499125788");
  const [Masculino, setMasculino] = useState("");
  const [Feminino, setFeminino] = useState("");
  const [Abacaxi, setAbacaxi] = useState("");

  function exibeDados() {
    console.log(Email);
    console.log(Senha);
    console.log(ConfirmarSenha);
    console.log(DataNascimento);
    console.log(Telefone);
    console.log(Masculino);
    console.log(Feminino);
    console.log(Abacaxi);
  }

  return (
    <>
      <div className={style.body}>
        <div className={style.cadastrar}>
          <h2> Cadastro </h2>
          <input
            type="text"
            placeholder="Nome Completo"
            className={style.input}
            value={Nome}
            onChange={(input) => setNome(input.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className={style.input}
            value={Email}
            onChange={(input) => setEmail(input.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className={style.input}
            value={Senha}
            onChange={(input) => setSenha(input.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            className={style.input}
            value={ConfirmarSenha}
            onChange={(input) => setConfirmarSenha(input.target.value)}
          />
          <input
            type="date"
            placeholder="Data de Nascimento"
            className={style.input}
            value={DataNascimento}
            onChange={(input) => setDataNascimento(input.target.value)}
          />
          <input
            type="number"
            placeholder="Telefone"
            className={style.input}
            value={Telefone}
            onChange={(input) => setTelefone(input.target.value)}
          />
          <input
            type="checkbox"
            placeholder="Gênero"
            className={style.checkbox}
            value={Masculino}
             onChange={(input) => setMasculino(input.target.value)}
          />
          Masculino
          <input
            type="checkbox"
            placeholder="Gênero"
            className={style.checkbox}
            value ={Feminino}
            onChange={(input) => setFeminino(input.target.value)}     
          />
          Feminino
          <input
            type="checkbox"
            placeholder="Gênero"
            className={style.checkbox}
            value="Abacaxi" onChange={(input) => setAbacaxi(input.target.value)}
          />
          Abacaxi
          <input
            type="checkbox"
            placeholder="Termos de Uso"
            className={style.input}
          />{" "}
          Aceito os <a href="#/termos de uso">Termos de Uso</a>
          <button className={style.button} onClick={exibeDados}>
            Cadastrar
          </button>
          <div className={style.login}>
            Já tem uma conta? <a href="#/login">Fazer Login</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
