import { useState } from "react";
import style from "./Cadastro.module.css";
import { useNavigate } from "react-router-dom";
import { Service } from "../../../component/Service";

function Cadastro() {
  async function fazerCadastro() {
    try {
      const sucesso = await Service.GET("EfetuarCadastro", {
        Nome: usuario.nome,
        Email: usuario.email,
        Senha: usuario.senha,
        DataNascimento: usuario.dataNascimento,
        Telefone: usuario.telefone,
        Masculino: usuario.masculino,
        Feminino: usuario.feminino,
        Abacaxi: usuario.abacaxi,
        Termos: usuario.Termos,
      });

      if (sucesso != null) {
        console.log("Cadastro feito com sucesso");
        Navigate("/Login");
      }
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
    }
  }
  const Navigate = useNavigate();

  const [mensagem, setMensagem] = useState("");
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
    Termos: false,
  });

 function validarFormulario() {
  for (const campo in usuario) {
    const valor = usuario[campo as keyof typeof usuario];

    if (typeof valor === "string" && valor.trim() === "") {
      setMensagem(`O campo ${campo} está vazio`);
      return false;
    }
  }

  if (!usuario.masculino && !usuario.feminino && !usuario.abacaxi) {
    setMensagem("Selecione um gênero");
    return false;
  }

  if (!usuario.Termos) {
    setMensagem("Aceite os termos de uso para cadastrar");
    return false;
  }

  if (usuario.senha !== usuario.confirmarsenha) {
    setMensagem("As senhas não coincidem");
    return false;
  }

  setMensagem(""); // limpa mensagens antigas
  return true;
}


  return (
    <>
      <div className={style.body}>
        <div className={style.cadastrar}>
          <h2> Cadastro </h2>

          {mensagem && <div className={style.aviso}>{mensagem}</div>}

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
                checked={usuario.Termos}
                onChange={(input) =>
                  setUsuario({ ...usuario, Termos: input.target.checked })
                }
              />{" "}
              Aceito os{" "}
              <a className={style.link} href="#/termos de uso">
                Termos de Uso
              </a>
            </label>
          </div>

          <button
            className={style.button}
            onClick={async () => {
              if (validarFormulario()) {
                await fazerCadastro();
              }
            }}
          >
            Cadastrar
          </button>
          <div className={style.login}>
            Já tem uma conta?{" "}
            <a className={style.link} onClick={() => Navigate("/Login")}>
              Fazer Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
