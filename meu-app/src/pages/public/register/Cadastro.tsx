import { useState } from "react";
import style from "./Cadastro.module.css";

function Cadastro() {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarsenha: "",
    dataNascimento: "",
    telefone: "",
    masculino: false,
    feminino: false,
    abacaxi: false,
  });

  function exibeDados() {
    console.log(usuario);
  }

  function validarFormulario() {


      for (const campo in usuario) {
        if (
          typeof usuario [campo as keyof typeof usuario]  === "string" &&
          usuario [campo as keyof typeof usuario].trim() === ""
        ) {
          alert(`O campo ${campo} está vazio`);
          return;
        }
      }

      if (!usuario.masculino && !usuario.feminino && !usuario.abacaxi) {
        alert("Selecione um gênero");
        return;
      }

      if (usuario.senha !== usuario.confirmarsenha) {
        alert("As senhas não coincidem");
        return;
      }

      exibeDados();

      alert("Cadastro realizado!");
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
            value={usuario.nome}
            onChange={(input) =>
              setUsuario({ ...usuario, nome: input.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className={style.input}
            value={usuario.email}
            onChange={(input) =>
              setUsuario({ ...usuario, email: input.target.value })
            }
          />
          <input
            type="password"
            placeholder="Senha"
            className={style.input}
            value={usuario.senha}
            onChange={(input) =>
              setUsuario({ ...usuario, senha: input.target.value })
            }
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            className={style.input}
            value={usuario.confirmarsenha}
            onChange={(input) =>
              setUsuario({ ...usuario, confirmarsenha: input.target.value })
            }
          />
          <input
            type="date"
            placeholder="Data de Nascimento"
            className={style.input}
            value={usuario.dataNascimento}
            onChange={(input) =>
              setUsuario({ ...usuario, dataNascimento: input.target.value })
            }
          />
          <input
            type="number"
            placeholder="Telefone"
            className={style.input}
            value={usuario.telefone}
            onChange={(input) =>
              setUsuario({ ...usuario, telefone: input.target.value })
            }
          />
          <div>
            <label className={style.checkboxGenero}>
              <input
                type="checkbox"
                placeholder="Gênero"
                className={style.checkbox}
                checked={usuario.masculino}
                onChange={(input) =>
                  setUsuario({ ...usuario, masculino: input.target.checked })
                }
              />
              Masculino
            </label>
          </div>
          <div>
            <label className={style.checkboxGenero}>
              <input
                type="checkbox"
                placeholder="Gênero"
                className={style.checkbox}
                checked={usuario.feminino}
                onChange={(input) =>
                  setUsuario({ ...usuario, feminino: input.target.checked })
                }
              />
              Feminino
            </label>
          </div>
          <div>
            <label className={style.checkboxGenero}>
              <input
                type="checkbox"
                placeholder="Gênero"
                className={style.checkbox}
                checked={usuario.abacaxi}
                onChange={(input) =>
                  setUsuario({ ...usuario, abacaxi: input.target.checked })
                }
              />
              Abacaxi
            </label>
          </div>

          <div>
            <label className={style.checkboxGenero}>
              <input
                type="checkbox"
                placeholder="Termos de Uso"
                className={style.checkbox}
              />{" "}
              Aceito os <a href="#/termos de uso">Termos de Uso</a>
            </label>
          </div>

          <button className={style.button} onClick={validarFormulario}>
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
