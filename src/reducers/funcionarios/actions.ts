import { FuncionarioState } from "../../contexts/FuncionariosContext";
import { Funcionario } from "../../utils/interfaces";

export enum funcionariosActionTypes {
  INITIAL_STATE_FUNCIONARIOS = "INITIAL_STATE_FUNCIONARIOS"
}

export function initialStateFuncionarios(initialState: Funcionario[]){
  return {
    type: funcionariosActionTypes.INITIAL_STATE_FUNCIONARIOS,
    payload: {
      initialState
    }
  }
}