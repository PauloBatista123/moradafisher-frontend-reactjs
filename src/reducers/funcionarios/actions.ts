import { FuncionarioState } from "../../contexts/FuncionariosContext";

export enum funcionariosActionTypes {
  INITIAL_STATE_FUNCIONARIOS = "INITIAL_STATE_FUNCIONARIOS"
}

export function initialStateFuncionarios(inititalState: FuncionarioState){
  return {
    type: funcionariosActionTypes.INITIAL_STATE_FUNCIONARIOS,
    payload: {
      inititalState
    }
  }
}