import { Service } from "./services";

export type Produto = {
  codigo: string;
  nome: string;
  categoria: string;
  Marca: string;
  valor: number;
  estoque: number;
  imagem?: string;
  detalhes: {
    [key: string]: string | number;
  };
};

type ProdutoApi = Partial<Produto> & {
  id?: string | number;
  id_produto?: string | number;
  tx_nome?: string;
  marca?: string;
  tx_marca?: string;
  price?: number;
  nr_preco?: number | string;
  nr_estoque?: number | string;
  cd_categoria?: string | number;
  tx_categoria?: string;
  tx_nome_categoria?: string;
  categoria_nome?: string;
  tx_caminho?: string;
  caminhoImagem?: string;
  imagemUrl?: string;
};

type ProdutosApiResposta = ProdutoApi[] | {
  dados?: ProdutoApi[];
  content?: ProdutoApi[];
  produtos?: ProdutoApi[];
};

function normalizarProduto(produto: ProdutoApi): Produto {
  return {
    codigo: String(produto.codigo ?? produto.id_produto ?? produto.id ?? ""),
    nome: produto.nome ?? produto.tx_nome ?? "",
    categoria: String(
      produto.categoria ??
        produto.categoria_nome ??
        produto.tx_nome_categoria ??
        produto.tx_categoria ??
        produto.cd_categoria ??
        "Pecas",
    ),
    Marca: produto.Marca ?? produto.marca ?? produto.tx_marca ?? "",
    valor: Number(produto.valor ?? produto.nr_preco ?? produto.price ?? 0),
    estoque: Number(produto.estoque ?? produto.nr_estoque ?? 0),
    imagem: produto.imagem ?? produto.imagemUrl ?? produto.caminhoImagem ?? produto.tx_caminho,
    detalhes: produto.detalhes ?? {},
  };
}

export const produtoService = {
  async listar(query?: string): Promise<Produto[]> {
    const params = query?.trim() ? { q: query.trim() } : undefined;
    const resposta = await Service.GET<ProdutosApiResposta>("produto/produtos", params);

    const lista = Array.isArray(resposta)
      ? resposta
      : resposta.dados ?? resposta.content ?? resposta.produtos ?? [];

    return lista.map(normalizarProduto);
  },
};

export async function listarProdutos(query?: string): Promise<Produto[]> {
  return produtoService.listar(query?.trim() ? query.trim() : undefined);
}
