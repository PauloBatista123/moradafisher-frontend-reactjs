import { ProdutosContextData } from "../../contexts/ProdutosContext"
import { Produtos } from "../../utils/interfaces"

export enum produtosActionTypes {
  INITIAL_STATE_PRODUTOS = "INITIAL_STATE_PRODUTOS",
  CRIAR_NOVO_PRODUTO = "CRIAR_NOVO_PRODUTO",
  DELETAR_PRODUTO = "DELETAR_PRODUTO",
  IS_LOADING = "IS_LOADING",
  IS_NOT_LOADING = "IS_NOT_LOADING",
}

export interface ProdutosData {
  data: Produtos[],
  isLoading: boolean,
}


export function initialStateProdutosAction(inicialState: ProdutosData){
  return {
    type: produtosActionTypes.INITIAL_STATE_PRODUTOS,
    payload: {
      inicialState
    }
  }
}

export function criarNovoProdutoAction({data, isLoading = true}: ProdutosData){
  return {
    type: produtosActionTypes.CRIAR_NOVO_PRODUTO,
    payload: {
      data,
      isLoading
    }
  }
}

export function deletarProdutoAction(id: number, isLoading = true){
  return {
    type: produtosActionTypes.DELETAR_PRODUTO,
    payload: {
      id,
      isLoading
    }
  }
}

export function isLoadingAppAction(){
  return {
    type: produtosActionTypes.IS_LOADING,
  }
}

export function isNotLoadingAppAction(){
  return {
    type: produtosActionTypes.IS_NOT_LOADING
  }
}