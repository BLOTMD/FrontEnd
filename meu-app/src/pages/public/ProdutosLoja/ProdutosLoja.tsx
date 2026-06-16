import { useEffect, useState } from "react";
import { listarProdutos } from "../../../components/services/ProdutoServices";
import styles from "./ProdutosLoja.module.css";

type Produto = {
  codigo: number;
  nome: string;
  valor: number;
};

export default function ProdutosLoja() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProdutos() {
      try {
        const data = await listarProdutos();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProdutos();
  }, []);

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <div className={styles.container}>
      <h2>Loja de Produtos</h2>

      {produtos.length === 0 ? (
        <p>Nenhum produto encontrado</p>
      ) : (
        <div className={styles.grid}>
          {produtos.map((p) => (
            <div key={p.codigo} className={styles.card}>
              <h3>{p.nome}</h3>
              <p>R$ {p.valor}</p>

              <button>Adicionar ao carrinho</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}