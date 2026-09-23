import type { Produto } from "../services/ProdutoServices";

export const shopInterface = {
  categorias: ["Todos", "CPU", "GPU", "RAM", "Storage", "Fonte", "Placa-mae", "Gabinete"],
  destaques: [
    { rotulo: "Entrega", valor: "Rapida" },
    { rotulo: "Suporte", valor: "Setup guiado" },
    { rotulo: "Garantia", valor: "Compra segura" },
  ],
  formatarMoeda(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  },
  statusEstoque(produto: Produto) {
    if (produto.estoque <= 0) return "Indisponivel";
    if (produto.estoque <= 5) return "Ultimas unidades";
    return "Em estoque";
  },
  combinarBusca(produto: Produto, termo: string, categoria: string) {
    const busca = termo.trim().toLowerCase();
    const textoProduto = `${produto.nome} ${produto.Marca} ${produto.categoria}`.toLowerCase();
    const bateCategoria = categoria === "Todos" || produto.categoria.toLowerCase().includes(categoria.toLowerCase());

    return bateCategoria && (!busca || textoProduto.includes(busca));
  },
};
