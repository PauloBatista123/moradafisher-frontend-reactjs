import produce from "immer";
import { FuncionarioState } from "../../contexts/FuncionariosContext";
import { funcionariosActionTypes } from "./actions";

export function funcionariosReducer(state: FuncionarioState, action: any){
  switch(action.type){

    case funcionariosActionTypes.INITIAL_STATE_FUNCIONARIOS: {
      return produce(state, draft => {
        draft.data = action.payload.initialState;
        draft.isLoading = false;
      })
    }
   
    default: return state;
  }
}