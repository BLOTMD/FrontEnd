import { useState } from "react";
import style from "./Cadastro.module.css";
import { useNavigate } from "react-router-dom";
import { Service } from "../../../component/Service";
import type { CadastroInterface } from "../../../interfaces/Cadastro";

function Cadastro() {
  const navigate = useNavigate();

  const [mensagem, setMensagem] = useState("");

  const [usuario, setUsuario] = useState<CadastroInterface>({
    user: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    DataNascimento: "",
    Telefone: "",
    masculino: false,
    feminino: false,
    abacaxi: false,
    termos: false,
  });

  async function fazerCadastro() {
    try {
      const sucesso = await Service.POST("EfetuarCadastro", usuario);

      if (sucesso) {
        console.log("Cadastro feito com sucesso");
        navigate("/Login");
      }
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
      setMensagem("Erro ao realizar cadastro");
    }
  }

  function validarFormulario() {
    if (!usuario.user.trim()) {
      setMensagem("Informe seu nome");
      return false;
    }

    if (!usuario.email.trim()) {
      setMensagem("Informe seu email");
      return false;
    }

    if (!usuario.senha.trim()) {
      setMensagem("Informe sua senha");
      return false;
    }

    if (!usuario.confirmarSenha.trim()) {
      setMensagem("Confirme sua senha");
      return false;
    }

    if (!usuario.DataNascimento) {
      setMensagem("Informe sua data de nascimento");
      return false;
    }

    if (!usuario.Telefone.trim()) {
      setMensagem("Informe seu telefone");
      return false;
    }

    if (!usuario.masculino && !usuario.feminino && !usuario.abacaxi) {
      setMensagem("Selecione um gênero");
      return false;
    }

    if (!usuario.termos) {
      setMensagem("Aceite os termos de uso");
      return false;
    }

    if (usuario.senha !== usuario.confirmarSenha) {
      setMensagem("As senhas não coincidem");
      return false;
    }

    setMensagem("");
    return true;
  }

  return (
    <div className={style.body}>
      <div className={style.cadastrar}>
        <h2>Cadastro</h2>

        {mensagem && <div className={style.aviso}>{mensagem}</div>}

        <input
          type="text"
          placeholder="Nome Completo"
          className={style.input}
          value={usuario.user}
          onChange={(e) =>
            setUsuario({
              ...usuario,
              user: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className={style.input}
          value={usuario.email}
          onChange={(e) =>
            setUsuario({
              ...usuario,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Senha"
          className={style.input}
          value={usuario.senha}
          onChange={(e) =>
            setUsuario({
              ...usuario,
              senha: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Confirmar Senha"
          className={style.input}
          value={usuario.confirmarSenha}
          onChange={(e) =>
            setUsuario({
              ...usuario,
              confirmarSenha: e.target.value,
            })
          }
        />

        <input
          type="date"
          className={style.input}
          value={usuario.DataNascimento}
          onChange={(e) =>
            setUsuario({
              ...usuario,
              DataNascimento: e.target.value,
            })
          }
        />

        <input
          type="tel"
          placeholder="Telefone"
          className={style.input}
          value={usuario.Telefone}
          onChange={(e) =>
            setUsuario({
              ...usuario,
              Telefone: e.target.value,
            })
          }
        />

        <label className={style.checkboxGenero}>
          <input
            type="checkbox"
            checked={usuario.masculino}
            onChange={(e) =>
              setUsuario({
                ...usuario,
                masculino: e.target.checked,
              })
            }
          />
          Masculino
        </label>

        <label className={style.checkboxGenero}>
          <input
            type="checkbox"
            checked={usuario.feminino}
            onChange={(e) =>
              setUsuario({
                ...usuario,
                feminino: e.target.checked,
              })
            }
          />
          Feminino
        </label>

        <label className={style.checkboxGenero}>
          <input
            type="checkbox"
            checked={usuario.abacaxi}
            onChange={(e) =>
              setUsuario({
                ...usuario,
                abacaxi: e.target.checked,
              })
            }
          />
          Abacaxi
        </label>

        <label className={style.checkboxGenero}>
          <input
            type="checkbox"
            checked={usuario.termos}
            onChange={(e) =>
              setUsuario({
                ...usuario,
                termos: e.target.checked,
              })
            }
          />
          Aceito os Termos de Uso
        </label>

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
          <a className={style.link} onClick={() => navigate("/Login")}>
            Fazer Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
