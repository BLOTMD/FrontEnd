import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import {
  listarProdutos,
  type Produto,
} from "../components/services/ProdutoServices";
import styles from "./loja.module.css";

function Loja() {
  const { addToCart, cart } = useCart();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pesquisar, setPesquisar] = useState("");
  const [loading, setLoading] = useState(true);

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantidadecodigo,
    0
  );

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await listarProdutos();
        setProdutos(resposta);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarProdutos();
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(pesquisar.toLowerCase())
  );

  return (
    <section className={styles.loja}>
      <header className={styles.header}>
        <div>
          <h1>Loja EasyPC</h1>
          <p>Escolha peças para montar seu computador.</p>
        </div>

        <strong className={styles.cartCount}>
          {totalItems} no carrinho
        </strong>
      </header>

      <input
        type="text"
        placeholder="Pesquisar produtos..."
        className={styles.pesquisar}
        value={pesquisar}
        onChange={(e) => setPesquisar(e.target.value)}
      />

      {loading ? (
        <p className={styles.loading}>Carregando produtos...</p>
      ) : produtosFiltrados.length === 0 ? (
        <p className={styles.empty}>Nenhum produto encontrado.</p>
      ) : (
        <div className={styles.grid}>
          {produtosFiltrados.map((produto) => (
            <article className={styles.card} key={produto.codigo}>
              <div className={styles.cardBody}>
                <span className={styles.category}>
                  {produto.categoria}
                </span>

                <h2>{produto.nome}</h2>

                <p>{produto.Marca}</p>

                <strong>
                  {produto.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>

                <button
                  type="button"
                  onClick={() => addToCart(produto.codigo)}
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Loja;