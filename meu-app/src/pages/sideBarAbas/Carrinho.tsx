import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";
import styles from "./Carrinho.module.css";

function Carrinho() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const cartProducts = cart.map((item) => {
    const product = products.find((product) => product.id === item.productId);

    return {
      ...item,
      product,
    };
  });

  const total = cartProducts.reduce((sum, item) => {
    if (!item.product) return sum;

    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <section className={styles.cart}>
      <h1>Carrinho</h1>

      {cart.length === 0 && (
        <p className={styles.empty}>Seu carrinho esta vazio.</p>
      )}

      <div className={styles.items}>
        {cartProducts.map((item) => {
          if (!item.product) return null;

          return (
            <article className={styles.item} key={item.productId}>
              <img src={item.product.image} alt={item.product.name} />

              <div className={styles.info}>
                <h2>{item.product.name}</h2>

                <p>
                  {item.product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>

                <strong>
                  Subtotal:{" "}
                  {(item.product.price * item.quantity).toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    },
                  )}
                </strong>
              </div>

              <div className={styles.actions}>
                <div className={styles.quantity}>
                  <button
                    type="button"
                    aria-label={`Diminuir quantidade de ${item.product.name}`}
                    onClick={() => decreaseQuantity(item.productId)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    aria-label={`Aumentar quantidade de ${item.product.name}`}
                    onClick={() => increaseQuantity(item.productId)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remover
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {cart.length > 0 && (
        <footer className={styles.summary}>
          <h2>
            Total:{" "}
            {total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </h2>

          <button type="button" onClick={clearCart}>
            Limpar carrinho
          </button>
        </footer>
      )}
    </section>
  );
}

export default Carrinho;
