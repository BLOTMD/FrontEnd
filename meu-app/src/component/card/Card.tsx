import styles from "./Card.module.css";

interface CardProps {
  titulo: string;
  valor: string;
  imagem?: string;
  categoria?: string;
  marca?: string;
  textoBotao?: string;
  onClick?: () => void;
}

function Card({ titulo, valor, imagem, categoria, marca, textoBotao, onClick }: CardProps) {
  return (
    <div className={styles.card}>
      {imagem ? (
        <img className={styles.imagem} src={imagem} alt={titulo} />
      ) : (
        <div className={styles.semImagem}>{titulo.slice(0, 2).toUpperCase()}</div>
      )}

      <div className={styles.conteudo}>
        {categoria && <span className={styles.categoria}>{categoria}</span>}
        <h2 className={styles.titulo}>{titulo}</h2>
        {marca && <p className={styles.marca}>{marca}</p>}
        <strong className={styles.valor}>{valor}</strong>

        {textoBotao && (
          <button className={styles.botao} type="button" onClick={onClick}>
            {textoBotao}
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
