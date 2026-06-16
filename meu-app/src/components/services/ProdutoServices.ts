import { Service } from "./services";

export type Produto = {
  codigo: number;
  nome: string;
  valor: number;
};

export const produtoService = {
  // 🔹 LISTAR PRODUTOS
  async listar(): Promise<Produto[]> {
    return Service.GET<Produto[]>("api/produtos");
  },

  // 🔹 BUSCAR UM PRODUTO POR ID
  async buscarPorId(codigo: number): Promise<Produto> {
    return Service.GET<Produto>(`api/produtos/${codigo}`);
  },

  // 🔹 CRIAR PRODUTO
  async criar(produto: Omit<Produto, "codigo">) {
    return Service.POST("api/produtos", produto);
  },

  // 🔹 ATUALIZAR PRODUTO
  async atualizar(codigo: number, produto: Partial<Produto>) {
    return Service.PUT(`api/produtos/${codigo}`, produto);
  },

  // 🔹 DELETAR PRODUTO
  async deletar(codigo: number) {
    return Service.DELETE(`api/produtos/${codigo}`);
  },
};

export async function listarProdutos(): Promise<Produto[]> {
  return produtoService.listar();
}
