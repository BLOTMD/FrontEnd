import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Service } from "../../../component/service/Service";
import style from "./SaveProducts.module.css";

export default function RemoveProduct() {
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function removerProduto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem("");
    setEnviando(true);
    try {
      const resposta = await Service.DELETE<{ mensagem: string }, { codigo: string; nome: string }>(
        "produto/produtos", { codigo: codigo.trim(), nome: nome.trim() },
      );
      setMensagem(resposta.mensagem);
      setCodigo("");
      setNome("");
    } catch (error) {
      setMensagem(error instanceof Error ? error.message : "Erro ao remover produto.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className={style.body}>
      <form className={style.cadastrar} onSubmit={removerProduto}>
        <h2>Retirar produto da loja</h2>
        {mensagem && <div className={style.aviso} role="status">{mensagem}</div>}
        <input className={style.input} required placeholder="Código do produto" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
        <input className={style.input} required placeholder="Nome do produto" value={nome} onChange={(e) => setNome(e.target.value)} />
        <button className={style.botao} type="submit" disabled={enviando}>{enviando ? "Removendo..." : "Remover produto"}</button>
        <Link className={style.link} to="/saveProdutos">Voltar ao cadastro</Link>
      </form>
    </div>
  );
}
