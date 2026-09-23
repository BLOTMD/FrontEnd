import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./sideBar.module.css";

function Sidebar() {
  const [aberta, setAberta] = useState(false);

  function fecharMenu() {
    setAberta(false);
  }

  return (
    <>
      <button
        type="button"
        className={styles.menuButton}
        onClick={() => setAberta((menuAberto) => !menuAberto)}
        aria-label={aberta ? "Fechar menu" : "Abrir menu"}
        aria-expanded={aberta}
      >
        <span />
        <span />
        <span />
      </button>

      {aberta && (
        <button
          type="button"
          className={styles.backdrop}
          onClick={fecharMenu}
          aria-label="Fechar menu lateral"
        />
      )}

      <aside className={`${styles.sidebar} ${aberta ? styles.sidebarAberta : ""}`}>
        <Link to="/loja" className={styles.logo} onClick={fecharMenu}>
          EasyPC
        </Link>

        <nav className={styles.menu}>
          <Link to="/comparacao" onClick={fecharMenu}>Comparacao</Link>
          <Link to="/carrinho" onClick={fecharMenu}>Carrinho</Link>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
