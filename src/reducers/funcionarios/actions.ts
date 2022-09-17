import { FuncionarioState } from "../../contexts/FuncionariosContext";
import { Funcionario } from "../../utils/interfaces";

export enum funcionariosActionTypes {
  INITIAL_STATE_FUNCIONARIOS = "INITIAL_STATE_FUNCIONARIOS",
  CREATE_FUNCIONARIOS = "CREATE_FUNCIONARIOS",
  DELETE_FUNCIONARIOS = "DELETE_FUNCIONARIOS"
}

export function initialStateFuncionarios(initialState: Funcionario[]){
  return {
    type: funcionariosActionTypes.INITIAL_STATE_FUNCIONARIOS,
    payload: {
      initialState
    }
  }
}

export function criarFuncionarioAction({data, isLoading = true}: FuncionarioState){
  return {
    type: funcionariosActionTypes.CREATE_FUNCIONARIOS,
    payload: {
      data, isLoading
    }
  }
}

export function deletarFuncionarioAction(data: Funcionario, isLoading = true){
  return {
    type: funcionariosActionTypes.DELETE_FUNCIONARIOS,
    payload: {
      data, isLoading
    }
  }
}