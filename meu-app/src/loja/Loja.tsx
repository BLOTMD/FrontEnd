import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import {
  listarProdutos,
  type Produto,
} from "../components/services/ProdutoServices";
import { shopInterface } from "../components/ui/interfaceObjects";
import Card from "../component/card/Card";
import styles from "./loja.module.css";

function Loja() {
  const { addToCart, cart } = useCart();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pesquisar, setPesquisar] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
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
    shopInterface.combinarBusca(produto, pesquisar, categoriaAtiva)
  );

  return (
    <section className={styles.loja}>
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>EasyPC Store</span>
          <h1>Monte seu setup com pecas escolhidas sem dor de cabeca.</h1>
          <p>
            Busque componentes, confira estoque e mande tudo para o carrinho em
            uma loja pronta para conversar com o seu banco de dados.
          </p>

          <div className={styles.highlights}>
            {shopInterface.destaques.map((item) => (
              <span key={item.rotulo}>
                <strong>{item.valor}</strong>
                {item.rotulo}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.cartPanel}>
          <span>Carrinho</span>
          <strong>{totalItems}</strong>
          <p>{totalItems === 1 ? "item separado" : "itens separados"}</p>
        </div>
      </header>

      <div className={styles.toolbar}>
        <label className={styles.search}>
          <span>Pesquisar produtos</span>
          <input
            type="text"
            placeholder="Ex: RTX, Ryzen, SSD..."
            value={pesquisar}
            onChange={(e) => setPesquisar(e.target.value)}
          />
        </label>

        <div className={styles.categories} aria-label="Categorias">
          {shopInterface.categorias.map((categoria) => (
            <button
              key={categoria}
              type="button"
              className={categoriaAtiva === categoria ? styles.activeCategory : ""}
              onClick={() => setCategoriaAtiva(categoria)}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className={styles.state}>Carregando produtos...</div>
      ) : produtosFiltrados.length === 0 ? (
        <div className={styles.state}>Nenhum produto encontrado.</div>
      ) : (
        <div className={styles.grid}>
          {produtosFiltrados.map((produto) => (
            <Card
              key={produto.codigo}
              titulo={produto.nome}
              marca={produto.Marca}
              categoria={produto.categoria}
              valor={shopInterface.formatarMoeda(produto.valor)}
              imagem={produto.imagem}
              status={shopInterface.statusEstoque(produto)}
              detalhe={`${produto.estoque} em estoque`}
              textoBotao={produto.estoque <= 0 ? "Indisponivel" : "Adicionar"}
              onClick={() => addToCart(produto.codigo)}
              disabled={produto.estoque <= 0}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Loja;
