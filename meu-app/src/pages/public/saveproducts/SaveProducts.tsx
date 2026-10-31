import { useState, type FormEvent } from "react";
import style from "./SaveProducts.module.css";
import { Service } from "../../../component/service/Service";
import { Link } from "react-router-dom";

type Detalhe = { chave: string; valor: string };
type NovoProduto = {
  codigo: string;
  nome: string;
  categoria: string;
  marca: string;
  valor: string;
  estoque: string;
  imagem: string;
};

const produtoVazio: NovoProduto = {
  codigo: "", nome: "", categoria: "", marca: "", valor: "", estoque: "0", imagem: "",
};

export default function SaveProducts() {
  const [produto, setProduto] = useState<NovoProduto>(produtoVazio);
  const [detalhes, setDetalhes] = useState<Detalhe[]>([{ chave: "", valor: "" }]);
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  function atualizar(campo: keyof NovoProduto, valor: string) {
    setProduto((atual) => ({ ...atual, [campo]: valor }));
  }

  async function cadastrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem("");
    const preco = Number(produto.valor.replace(",", "."));
    const estoque = Number(produto.estoque);
    if (!Number.isFinite(preco) || preco <= 0) {
      setMensagem("Informe um preço maior que zero, com até 10 caracteres.");
      return;
    }
    if (!Number.isInteger(estoque) || estoque < 0) {
      setMensagem("Informe um estoque inteiro não negativo, com até 10 caracteres.");
      return;
    }
    setEnviando(true);
    try {
      const detalhesProduto = Object.fromEntries(
        detalhes.filter((item) => item.chave.trim()).map((item) => [item.chave.trim(), item.valor.trim()]),
      );
      await Service.POST("produto/saveProdutos", {
        codigo: produto.codigo.trim(),
        nome: produto.nome.trim(),
        categoria: produto.categoria.trim(),
        marca: produto.marca.trim(),
        price: preco,
        estoque,
        imagem: produto.imagem.trim() || null,
        detalhes: detalhesProduto,
      });
      setMensagem("Produto cadastrado com sucesso!");
      setProduto(produtoVazio);
      setDetalhes([{ chave: "", valor: "" }]);
    } catch (error) {
      setMensagem(error instanceof Error ? error.message : "Erro ao cadastrar produto.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className={style.body}>
      <form className={style.cadastrar} onSubmit={cadastrar}>
        <h2>Adicionar produto à loja</h2>
        {mensagem && <div className={style.aviso} role="status">{mensagem}</div>}
        <label className={style.campo}>Código do produto<input className={style.input} required value={produto.codigo} onChange={(e) => atualizar("codigo", e.target.value)} /></label>
        <label className={style.campo}>Nome<input className={style.input} required value={produto.nome} onChange={(e) => atualizar("nome", e.target.value)} /></label>
        <label className={style.campo}>Categoria<input className={style.input} required placeholder="Ex.: gpu, cpu, ram" value={produto.categoria} onChange={(e) => atualizar("categoria", e.target.value)} /></label>
        <label className={style.campo}>Marca<input className={style.input} required value={produto.marca} onChange={(e) => atualizar("marca", e.target.value)} /></label>
        <label className={style.campo}>Preço (R$)<input className={style.input} required type="text" inputMode="decimal" minLength={1} maxLength={10} pattern="[0-9]{1,7}([.,][0-9]{1,2})?" title="Digite até 7 números inteiros e até 2 casas decimais (máximo de 10 caracteres)." value={produto.valor} onChange={(e) => atualizar("valor", e.target.value.slice(0, 10))} /></label>
        <label className={style.campo}>Estoque<input className={style.input} required type="text" inputMode="numeric" minLength={1} maxLength={10} pattern="[0-9]{1,10}" title="Digite um número inteiro de 1 a 10 caracteres." value={produto.estoque} onChange={(e) => atualizar("estoque", e.target.value.slice(0, 10))} /></label>
        <label className={style.campo}>Imagem (URL)<input className={style.input} type="url" placeholder="https://..." value={produto.imagem} onChange={(e) => atualizar("imagem", e.target.value)} /></label>
        <fieldset className={style.detalhes}>
          <legend>Detalhes do produto</legend>
          {detalhes.map((item, index) => (
            <div className={style.linhaDetalhe} key={index}>
              <input className={style.input} aria-label="Nome do detalhe" placeholder="Ex.: memória" value={item.chave} onChange={(e) => setDetalhes((lista) => lista.map((d, i) => i === index ? { ...d, chave: e.target.value } : d))} />
              <input className={style.input} aria-label="Valor do detalhe" placeholder="Ex.: 8 GB" value={item.valor} onChange={(e) => setDetalhes((lista) => lista.map((d, i) => i === index ? { ...d, valor: e.target.value } : d))} />
              {detalhes.length > 1 && <button type="button" className={style.removerDetalhe} onClick={() => setDetalhes((lista) => lista.filter((_, i) => i !== index))}>Remover</button>}
            </div>
          ))}
          <button type="button" className={style.adicionarDetalhe} onClick={() => setDetalhes((lista) => [...lista, { chave: "", valor: "" }])}>Adicionar detalhe</button>
        </fieldset>
        <button className={style.botao} type="submit" disabled={enviando}>{enviando ? "Cadastrando..." : "Cadastrar produto"}</button>
        <Link className={style.link} to="/removerProduto">Tirar produto da loja</Link>
      </form>
    </div>
  );
}
