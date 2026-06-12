import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import styles from "./loja.module.css";

function Loja() {
  const [search, setSearch] = useState("");
  const { addToCart, cart } = useCart();

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) return products;

    return products.filter((product) => {
      const productText = `${product.name} ${product.brand} ${product.category}`;

      return productText.toLowerCase().includes(normalizedSearch);
    });
  }, [search]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <section className={styles.loja}>
      <header className={styles.header}>
        <div>
          <h1>Loja EasyPC</h1>
          <p>Escolha pecas para montar seu computador.</p>
        </div>

        <strong className={styles.cartCount}>{totalItems} no carrinho</strong>
      </header>

      <label className={styles.search}>
        <span>Pesquisar</span>
        <input
          type="search"
          placeholder="Nome, marca ou categoria"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>

      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <article className={styles.card} key={product.id}>
            <img src={product.image} alt={product.name} />

            <div className={styles.cardBody}>
              <span className={styles.category}>{product.category}</span>
              <h2>{product.name}</h2>
              <p>{product.brand}</p>

              <strong>
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </strong>

              <button type="button" onClick={() => addToCart(product.id)}>
                Adicionar ao carrinho
              </button>
            </div>
          </article>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className={styles.empty}>Nenhum produto encontrado.</p>
      )}
    </section>
  );
}

export default Loja;
