import styles from "./Home.module.css";
import logo from "../Images/LogoEasyPCesquematizada.png";

function Home() {
  return (
    <div className={styles.home}>
      <header className={styles.header}>

        <nav>
          <a href="#">Início</a>
          <a href="#">Quem Somos</a>
          <a href="#">Serviços</a>
          <a href="#">Contato</a>
        </nav>
      </header>

      <section className={styles.Acesso}>
        <div>
          <img src={logo} alt="Logo da EasyPC" className={styles.logo} />
          <h1>Monte o PC dos seus sonhos</h1>
          <p>
            Peças, computadores gamer com os
            melhores preços.
          </p>

          <button className={styles.AcessoButton}>Acessar</button>
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
    </div>
  );
}

export default Home;