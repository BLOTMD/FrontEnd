export interface InterfaceProduto {
    img?: string,
    id: string;
    nome: string;
    categoria: string;
    marca: string;
    price: number;
    detalhes: {
        [key: string]: string | number;
    };
}