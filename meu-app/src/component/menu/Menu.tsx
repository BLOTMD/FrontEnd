import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import logo from "../../pages/public/Images/LogoEasyPCesquematizada.png";
import styles from "./Menu.module.css";

interface MenuItems {
  label: string;
  path: string;
}

const menuItens: MenuItems[] = [
  { label: "Inicio", path: "/" },
  { label: "Cadastro", path: "/cadastro" },
  { label: "Usuario", path: "/usuario" },

  
];

const Menu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <nav>
          <ul>
            {menuItens.map((x) => (
              <li key={x.path}>
                <NavLink to={x.path}>{x.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section id="inicio" className={styles.Acesso}>
        <div>
          <img src={logo} alt="Logo da EasyPC" className={styles.logo} />

          <h1>Monte o PC dos seus sonhos</h1>

          <p>Peças, computadores gamer com os melhores preços.</p>

          <button className={styles.AcessoButton} onClick={() => navigate("/loja")}>
            Acessar
          </button>
        </div>
      </section>

      <section className={styles.cards}>
        <div className={styles.card}>
          <h2>Placas de Vídeo</h2>
          <p>RTX, RX e muito mais.</p>
        </div>

        <div className={styles.card}>
          <h2>Processadores</h2>
          <p>Intel e AMD.</p>
        </div>

        <div className={styles.card}>
          <h2>Computadores</h2>
          <p>Prontos para jogar.</p>
        </div>
      </section>

      <div className={styles.informacoes}>
        <section id="quemSomos">
          <h2>Quem Somos</h2>
          <p>
            A EasyPC foi criada para ajudar usuários a montar computadores
            compatíveis e encontrar as melhores peças para cada necessidade.
          </p>
        </section>

        <section id="servicos">
          <h2>Serviços</h2>
          <p>
            Montagem de PCs, venda de peças, análise de compatibilidade e
            recomendações de hardware.
          </p>
        </section>

        <section id="contato">
          <h2>Contato</h2>
          <p>WhatsApp: (49) 99999-9999</p>
          <p>Email: contato@easypc.com</p>
        </section>
      </div>
    </div>
  );
};
export default Menu;
