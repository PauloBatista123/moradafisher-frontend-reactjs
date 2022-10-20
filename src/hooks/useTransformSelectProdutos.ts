import { useAllProdutos } from "./useAllProdutos";

export function useTransformSelectProdutos(){
  const {data} = useAllProdutos();

  const produtos = data?.produtos.map(produto => {
    return {
      value: produto.id,
      optionText: produto.nome,
    }
  });

  return {
    produtos
  }
}