import { useState } from "react";
import styles from "./Loja.module.css";

function Loja() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className={styles.loja}>
      <button
        className={styles.menuButton}
        onClick={() => setMenuAberto(!menuAberto)}
      >
        ☰
      </button>

      <aside
        className={`${styles.sidebar} ${
          menuAberto ? styles.aberto : ""
        }`}
      >
        <h2>EasyPC</h2>

        <a href="#">🏠 Início</a>
        <a href="#">🖥️ Monte seu PC</a>
        <a href="#">🔧 Peças</a>
        <a href="#">🛒 Carrinho</a>
        <a href="#">👤 Perfil</a>
      </aside>

      <main className={styles.conteudo}>
        <h1>Bem-vindo à EasyPC</h1>

        <p className={styles.subtitulo}>
          Escolha peças, monte seu computador e encontre os melhores componentes.
        </p>

        <div className={styles.pesquisa}>
          <input
            type="text"
            placeholder="Pesquisar peças..."
          />
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>🖥️ Placas de Vídeo</h3>
            <p>RTX e Radeon.</p>
          </div>

          <div className={styles.card}>
            <h3>⚡ Processadores</h3>
            <p>Intel e AMD.</p>
          </div>

          <div className={styles.card}>
            <h3>💾 Memórias RAM</h3>
            <p>DDR4 e DDR5.</p>
          </div>

          <div className={styles.card}>
            <h3>🚀 SSDs</h3>
            <p>NVMe e SATA.</p>
          </div>

          <div className={styles.card}>
            <h3>🔌 Fontes</h3>
            <p>80 Plus Bronze, Gold e Platinum.</p>
          </div>

          <div className={styles.card}>
            <h3>🧩 Placas-Mãe</h3>
            <p>Intel e AMD.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Loja;