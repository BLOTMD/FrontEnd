import { useState } from "react";
import style from "./SaveProducts.module.css";
import { Service } from "../../../component/service/Service";
import Button from "../../../component/button/Button";
import type { InterfaceProduto } from "../../../interfaces/Produto";

function NovoProduto() {
  const [mensagem, setMensagem] = useState("");

  const [produto, setProduto] = useState<InterfaceProduto>({
    id: "",
    nome: "",
    categoria: "",
    marca: "",
    price: 0,
    detalhes: {},
  });

  async function FazerCadastroDeProduto() {
    try {
      const sucesso = await Service.POST("produto/saveProdutos", produto);

      if (sucesso) {
        setMensagem("Produto cadastrado com sucesso!");

        setProduto({
          id: "",
          nome: "",
          categoria: "",
          marca: "",
          price: 0,
          detalhes: {},
        });
      }
    } catch (error) {
      setMensagem("Erro ao cadastrar produto");
      console.error(error);
    }
  }

  function validarCadastroDeProduto() {
    if (!produto.id.trim()) {
      setMensagem("Informe o ID do produto");
      return false;
    }

    if (!produto.nome.trim()) {
      setMensagem("Informe o nome do produto");
      return false;
    }

    if (!produto.categoria.trim()) {
      setMensagem("Informe a categoria");
      return false;
    }

    if (!produto.marca.trim()) {
      setMensagem("Informe a marca");
      return false;
    }

    if (produto.price <= 0) {
      setMensagem("Informe um preço válido");
      return false;
    }

    setMensagem("");
    return true;
  }

  return (
    <div className={style.body}>
      <div className={style.cadastrar}>
        <h2>Cadastro de Produto</h2>

        {mensagem && <div className={style.aviso}>{mensagem}</div>}

        <input
          className={style.input}
          type="text"
          placeholder="ID"
          value={produto.id}
          onChange={(e) =>
            setProduto({
              ...produto,
              id: e.target.value,
            })
          }
        />

        <input
          className={style.input}
          type="text"
          placeholder="Nome"
          value={produto.nome}
          onChange={(e) =>
            setProduto({
              ...produto,
              nome: e.target.value,
            })
          }
        />

        <input
          className={style.input}
          type="text"
          placeholder="Categoria"
          value={produto.categoria}
          onChange={(e) =>
            setProduto({
              ...produto,
              categoria: e.target.value,
            })
          }
        />

        <input
          className={style.input}
          type="text"
          placeholder="Marca"
          value={produto.marca}
          onChange={(e) =>
            setProduto({
              ...produto,
              marca: e.target.value,
            })
          }
        />

        <input
          className={style.input}
          type="number"
          placeholder="Preço"
          value={produto.price}
          onChange={(e) =>
            setProduto({
              ...produto,
              price: Number(e.target.value),
            })
          }
        />

        <Button
          texto="Cadastrar Produto"
          Click={() => {
            if (validarCadastroDeProduto()) {
              FazerCadastroDeProduto();
            }
          }}
        />
      </div>
    </div>
  );
}

export default NovoProduto;
