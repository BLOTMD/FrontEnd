import styles from "./Card.module.css";

interface CardProps {
  titulo: string;
  valor: string;
  imagem?: string;
  categoria?: string;
  marca?: string;
  status?: string;
  descricao?: string;
  detalhe?: string;
  textoBotao?: string;
  onClick?: () => void;
  disabled?: boolean;
}

function Card({
  titulo,
  valor,
  imagem,
  categoria,
  marca,
  status,
  descricao,
  detalhe,
  textoBotao,
  onClick,
  disabled,
}: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.media}>
        {status && <span className={styles.status}>{status}</span>}
        {imagem ? (
          <img className={styles.imagem} src={imagem} alt={titulo} />
        ) : (
          <div className={styles.semImagem}>{titulo.slice(0, 2).toUpperCase()}</div>
        )}
      </div>

      <div className={styles.conteudo}>
        <div className={styles.meta}>
          {categoria && <span className={styles.categoria}>{categoria}</span>}
          {marca && <span className={styles.marca}>{marca}</span>}
        </div>
        <h2 className={styles.titulo}>{titulo}</h2>
        {descricao && <p className={styles.descricao}>{descricao}</p>}
        {detalhe && <p className={styles.detalhe}>{detalhe}</p>}

        <div className={styles.rodape}>
          <strong className={styles.valor}>{valor}</strong>

          {textoBotao && (
            <button className={styles.botao} type="button" onClick={onClick} disabled={disabled}>
              {textoBotao}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
