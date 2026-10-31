import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Service } from "../../../component/service/Service";
import { listarProdutos, type Produto } from "../../../components/services/ProdutoServices";
import style from "./SaveProducts.module.css";

export default function RemoveProduct() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [codigo, setCodigo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  async function carregarProdutos() {
    setCarregando(true);
    try {
      const lista = await listarProdutos();
      setProdutos(lista);
      setCodigo((atual) => lista.some((produto) => produto.codigo === atual) ? atual : "");
    } catch (error) {
      setMensagem(error instanceof Error ? error.message : "Erro ao carregar produtos.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => { void carregarProdutos(); }, []);

  const produtoSelecionado = produtos.find((produto) => produto.codigo === codigo);

  async function removerProduto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!produtoSelecionado) return;
    setMensagem("");
    setEnviando(true);
    try {
      const resposta = await Service.DELETE<{ mensagem: string }>(`produto/produtos/${encodeURIComponent(produtoSelecionado.codigo)}`);
      setMensagem(resposta.mensagem || "Produto removido da loja.");
      setProdutos((lista) => lista.filter((produto) => produto.codigo !== produtoSelecionado.codigo));
      setCodigo("");
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
        <label className={style.campo}>Produto
          <select className={style.input} required value={codigo} onChange={(e) => setCodigo(e.target.value)} disabled={carregando || produtos.length === 0}>
            <option value="">{carregando ? "Carregando produtos..." : "Selecione um produto"}</option>
            {produtos.map((produto) => <option key={produto.codigo} value={produto.codigo}>{produto.nome} — {produto.codigo}</option>)}
          </select>
        </label>
        {produtoSelecionado && (
          <section className={style.resumoProduto} aria-label="Dados do produto selecionado">
            <strong>{produtoSelecionado.nome}</strong>
            <span>Código: {produtoSelecionado.codigo}</span>
            <span>Categoria: {produtoSelecionado.categoria}</span>
            <span>Marca: {produtoSelecionado.Marca}</span>
            <span>Preço: {produtoSelecionado.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
            <span>Estoque: {produtoSelecionado.estoque}</span>
            {produtoSelecionado.imagem && <span>Imagem: {produtoSelecionado.imagem}</span>}
            {Object.entries(produtoSelecionado.detalhes).map(([chave, valor]) => <span key={chave}>{chave}: {valor}</span>)}
          </section>
        )}
        <button className={style.botao} type="submit" disabled={enviando || !produtoSelecionado}>{enviando ? "Removendo..." : "Remover produto"}</button>
        <Link className={style.link} to="/saveProdutos">Voltar ao cadastro</Link>
      </form>
    </div>
  );
}
