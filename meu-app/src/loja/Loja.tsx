import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import {
  listarProdutos,
  type Produto,
} from "../components/services/ProdutoServices";
import styles from "./loja.module.css";
import Card from "../component/card/Card";

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
            <Card
              key={produto.codigo}
              titulo={produto.nome}
              marca={produto.Marca}
              categoria={produto.categoria}
              valor={produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              textoBotao="Adicionar ao carrinho"
              onClick={() => addToCart(produto.codigo)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Loja;
