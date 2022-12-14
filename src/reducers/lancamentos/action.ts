import { Lancamento, newLancamentoProps } from "../../utils/interfaces"

export enum lancamentoActionType {
  INITIAL_STATE_LANCAMENTO = 'INITIAL_STATE_LANCAMENTO',
  CREATE_NEW_LANCAMENTO = 'CREATE_NEW_LANCAMENTO',
  DELETE_LANCAMENTOS = 'DELETE_LANCAMENTOS',
}

export interface LancamentoStateData {
  lancamentos: Lancamento[]
}

export function initialStateLancamentoAction(inicialState: LancamentoStateData){
  return {
    type: lancamentoActionType.INITIAL_STATE_LANCAMENTO,
    payload: {
      inicialState
    }
  }
}

export function createNewLancamentoAction(newLancamento: newLancamentoProps){
  return{
    type: lancamentoActionType.CREATE_NEW_LANCAMENTO,
    payload:{
      newLancamento
    }
  }
}

export function deletarLancamentoAction(data: Lancamento, isLoading = true){
  return {
    type: lancamentoActionType.DELETE_LANCAMENTOS,
    payload: {
      data, isLoading
    }
  }
}