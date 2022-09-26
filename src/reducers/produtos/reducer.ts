import produce from "immer";
import { ProdutosContextData } from "../../contexts/ProdutosContext";
import {produtosActionTypes, ProdutosData} from './action'

export function ProdutosReducer(state: ProdutosData, action: any){

  switch(action.type){

    case produtosActionTypes.IS_LOADING: {
      return produce(state, draft => {
        draft.isLoading = true;
      })
    }

    case produtosActionTypes.IS_NOT_LOADING: {
      return produce(state, draft => {
        draft.isLoading = false;
      })
    }
    
    case produtosActionTypes.INITIAL_STATE_PRODUTOS: {
      return produce(state, draft => {
        draft.data = action.payload.inicialState.data;
        draft.isLoading = false;
      });
    };
    

    case produtosActionTypes.CRIAR_NOVO_PRODUTO: {
      return produce(state, draft => { 
        draft.data.push(action.payload.data);
        draft.isLoading = false;
        console.log(draft.isLoading);
      });
    };

    case produtosActionTypes.DELETAR_PRODUTO: {
      return produce(state, draft => {
        const index = draft.data.findIndex(produto => produto.id === action.payload.id);

        if(index > -1){
          draft.data.splice(index, 1);
          draft.isLoading = false;
        }

      });
    }

    default:
      return state;
  }

}