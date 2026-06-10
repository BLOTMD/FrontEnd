import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>EasyPC</h2>

      <nav className={styles.menu}>
        <Link to="/">Início</Link>
        <Link to="/loja">Loja</Link>
        <Link to="/comparacao">Comparação</Link>
        <Link to="/carrinho">Carrinho</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;