import { lancamentoActionType, LancamentoStateData } from "./action";
import { produce } from 'immer'

export function LancamentoReducer(state: LancamentoStateData, action: any){

  switch(action.type){
    case lancamentoActionType.INITIAL_STATE_LANCAMENTO: {
      return produce(state, draft => {
        draft.lancamentos = action.payload.inicialState;
      })
    }
    case lancamentoActionType.CREATE_NEW_LANCAMENTO: {
      return produce(state, draft => {
        console.log(action.payload.newLancamento)
        draft.lancamentos.push(action.payload.newLancamento);
      });
    }
    default: 
      return state;
  }
}