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
    };

    case funcionariosActionTypes.CREATE_FUNCIONARIOS: {
      return produce(state, draft => {
        draft.data.push(action.payload.data);
        draft.isLoading = false;
      });
    };

    case funcionariosActionTypes.DELETE_FUNCIONARIOS: {
      const findIndex = state.data.findIndex(func => func.id === action.payload.data.id);

      return produce(state, draft => {
        draft.data.splice(findIndex, 1);
        draft.isLoading = false;
      });
    };
   
    default: return state;
  }
}