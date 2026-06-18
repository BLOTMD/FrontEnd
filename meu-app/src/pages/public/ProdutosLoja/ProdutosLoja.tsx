import { useEffect, useState } from "react";
import { listarProdutos} from "../../../components/services/ProdutoServices";
import styles from "./ProdutosLoja.module.css";

type Produto = {
  codigo: number;
  nome: string;
  valor: number;
  marca: string;
  categoria: "cpu" | "gpu" | "ram" | "motherboard" | "storage" | "psu" | "case" | "perifericos";
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
    <div>
      <h2>Loja de Produtos</h2>

      {produtos.length === 0 ? (
        <p>Nenhum produto encontrado</p>
      ) : (
        <div className={styles.grid}>
          {produtos.map((p) => (
            <div key={p.codigo} className={styles.card}>
              <h3>{p.nome}</h3>

              <p>{p.marca}</p>
              <p>{p.categoria}</p>

              <p>
                {p.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>

              <button>Adicionar ao carrinho</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}