import { useContext } from "react";
import { ProdutosContext } from "../contexts/ProdutosContext";

export function useProdutos(){
  const {produtoState, getUsers, deletarProduto, criarNovoProduto} = useContext(ProdutosContext);
  
  return {
    produtos: produtoState.data,
    isLoading: produtoState.isLoading,
    getUsers: getUsers,
    deletarProduto,
    criarNovoProduto
  }
}