import { useState } from "react";
import style from "./Cadastro.module.css";
import { useNavigate } from "react-router-dom";
import { Service } from "../../../component/service/Service";
import type { CadastroInterface } from "../../../interfaces/Cadastro";
import Button from "../../../component/button/Button";

type CadastroResposta = {
  sucesso: boolean;
  mensagem: string;
};

type ErrosCadastro = Partial<Record<keyof CadastroInterface, string>>;

function Cadastro() {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState<ErrosCadastro>({});
  const [loading, setLoading] = useState(false);

  const [usuario, setUsuario] = useState<CadastroInterface>({
    user: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    DataNascimento: "",
    Telefone: "",
    genero: "",
    termos: false,
  });

  function identificarCampoPelaMensagem(mensagemErro: string): keyof CadastroInterface | null {
    const mensagemNormalizada = mensagemErro.toLowerCase();

    if (mensagemNormalizada.includes("email")) return "email";
    if (mensagemNormalizada.includes("senha")) return "senha";
    if (mensagemNormalizada.includes("telefone")) return "Telefone";
    if (mensagemNormalizada.includes("nascimento") || mensagemNormalizada.includes("idade")) return "DataNascimento";
    if (mensagemNormalizada.includes("genero") || mensagemNormalizada.includes("gênero")) return "genero";
    if (mensagemNormalizada.includes("termos")) return "termos";
    if (mensagemNormalizada.includes("usuario") || mensagemNormalizada.includes("usuário") || mensagemNormalizada.includes("nome")) return "user";

    return null;
  }

  async function fazerCadastro() {
    setLoading(true);
    setMensagem("");

    try {
      const resposta = await Service.POST<CadastroInterface, CadastroResposta>("EfetuarCadastro", usuario);

      if (resposta.sucesso) {
        navigate("/login");
        return;
      }

      setMensagem(resposta.mensagem || "Não foi possível realizar o cadastro");
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : "Erro ao realizar cadastro";
      const campoComErro = identificarCampoPelaMensagem(mensagemErro);

      setMensagem(mensagemErro);

      if (campoComErro) {
        setErros((errosAtuais) => ({
          ...errosAtuais,
          [campoComErro]: mensagemErro,
        }));
      }
    } finally {
      setLoading(false);
    }
  }

  function validarFormulario() {
    const novosErros: ErrosCadastro = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    const hoje = new Date();
    const nascimento = usuario.DataNascimento ? new Date(`${usuario.DataNascimento}T00:00:00`) : null;

    if (!usuario.user.trim()) novosErros.user = "Informe seu nome completo";

    if (!usuario.email.trim()) novosErros.email = "Informe seu email";
    else if (!emailRegex.test(usuario.email)) novosErros.email = "Email inválido";

    if (!usuario.senha.trim()) novosErros.senha = "Informe sua senha";
    else if (usuario.senha.length < 6) novosErros.senha = "Senha deve ter no mínimo 6 caracteres";

    if (!usuario.confirmarSenha.trim()) novosErros.confirmarSenha = "Confirme sua senha";
    else if (usuario.senha !== usuario.confirmarSenha) novosErros.confirmarSenha = "As senhas não coincidem";

    if (!nascimento) novosErros.DataNascimento = "Informe sua data de nascimento";
    else if (nascimento > hoje) novosErros.DataNascimento = "A data de nascimento não pode ser no futuro";

    if (!usuario.Telefone.trim()) novosErros.Telefone = "Informe seu telefone";
    else if (!telefoneRegex.test(usuario.Telefone.trim())) novosErros.Telefone = "Informe um telefone válido com DDD";

    if (!usuario.genero) novosErros.genero = "Selecione um gênero";
    if (!usuario.termos) novosErros.termos = "Aceite os termos de uso";

    setErros(novosErros);

    const primeiraMensagem = Object.values(novosErros)[0];
    setMensagem(primeiraMensagem ?? "");

    return !primeiraMensagem;
  }

  return (
    <div className={style.body}>
      <div className={style.cadastrar}>
        <h2>Cadastro</h2>

        {mensagem && <div className={style.aviso}>{mensagem}</div>}

        <input
          className={`${style.input} ${erros.user ? style.inputErro : ""}`}
          placeholder="Nome Completo"
          value={usuario.user}
          onChange={(e) => setUsuario({ ...usuario, user: e.target.value })}
        />
        {erros.user && <span className={style.erroCampo}>{erros.user}</span>}

        <input
          className={`${style.input} ${erros.email ? style.inputErro : ""}`}
          placeholder="Email"
          value={usuario.email}
          onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
        />
        {erros.email && <span className={style.erroCampo}>{erros.email}</span>}

        <input
          className={`${style.input} ${erros.senha ? style.inputErro : ""}`}
          type="password"
          placeholder="Senha"
          value={usuario.senha}
          onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
        />
        {erros.senha && <span className={style.erroCampo}>{erros.senha}</span>}

        <input
          className={`${style.input} ${erros.confirmarSenha ? style.inputErro : ""}`}
          type="password"
          placeholder="Confirmar Senha"
          value={usuario.confirmarSenha}
          onChange={(e) => setUsuario({ ...usuario, confirmarSenha: e.target.value })}
        />
        {erros.confirmarSenha && <span className={style.erroCampo}>{erros.confirmarSenha}</span>}

        <input
          className={`${style.input} ${erros.DataNascimento ? style.inputErro : ""}`}
          type="date"
          value={usuario.DataNascimento}
          onChange={(e) => setUsuario({ ...usuario, DataNascimento: e.target.value })}
        />
        {erros.DataNascimento && <span className={style.erroCampo}>{erros.DataNascimento}</span>}

        <input
          className={`${style.input} ${erros.Telefone ? style.inputErro : ""}`}
          type="tel"
          placeholder="Telefone"
          value={usuario.Telefone}
          onChange={(e) => setUsuario({ ...usuario, Telefone: e.target.value })}
        />
        {erros.Telefone && <span className={style.erroCampo}>{erros.Telefone}</span>}

        <select
          className={`${style.input} ${erros.genero ? style.inputErro : ""}`}
          value={usuario.genero}
          onChange={(e) => setUsuario({ ...usuario, genero: e.target.value })}
        >
          <option value="">Selecione um gênero</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>
        {erros.genero && <span className={style.erroCampo}>{erros.genero}</span>}

        <label className={style.checkboxGenero}>
          <input
            type="checkbox"
            checked={usuario.termos}
            onChange={(e) => setUsuario({ ...usuario, termos: e.target.checked })}
          />
          Aceito os Termos de Uso
        </label>
        {erros.termos && <span className={style.erroCampo}>{erros.termos}</span>}

        <Button
          texto={loading ? "Cadastrando..." : "Cadastrar"}
          Click={() => validarFormulario() && fazerCadastro()}
        />

        <div className={style.login}>
          Já tem conta?{" "}
          <a className={style.link} onClick={() => navigate("/login")}>
            Fazer Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
