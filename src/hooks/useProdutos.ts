import { ProdutosContext } from "../contexts/ProdutosContext";
import {useContextSelector} from 'use-context-selector';

export function useProdutos(){

  const criarNovoProduto = useContextSelector(ProdutosContext, produto => produto.criarNovoProduto);
  const getProdutos = useContextSelector(ProdutosContext, produto => produto.getProdutos);
  const deletarProduto = useContextSelector(ProdutosContext, produto => produto.deletarProduto);
  const isLoading = useContextSelector(ProdutosContext, produto => produto.produtoState.isLoading);
  const produtos = useContextSelector(ProdutosContext, produto => produto.produtoState.data);
    
  return {
    produtos,
    isLoading,
    getProdutos,
    deletarProduto,
    criarNovoProduto
  }
}