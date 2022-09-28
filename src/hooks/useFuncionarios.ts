import { useContext } from "react"
import { FuncionariosContext } from "../contexts/FuncionariosContext"
import {useContextSelector} from 'use-context-selector';

export function useFuncionarios(){
  const criarFuncionario = useContextSelector(FuncionariosContext, func => func.criarFuncionario);
  const getFuncionarios = useContextSelector(FuncionariosContext, func => func.getFuncionarios);
  const deleteFuncionario = useContextSelector(FuncionariosContext, func => func.deleteFuncionario);
  const isLoading = useContextSelector(FuncionariosContext, func => func.funcionarioState.isLoading);
  const funcionarios = useContextSelector(FuncionariosContext, func => func.funcionarioState.data);

  return {
    funcionarios,
    isLoading,
    criarFuncionario,
    getFuncionarios,
    deleteFuncionario
  }
}