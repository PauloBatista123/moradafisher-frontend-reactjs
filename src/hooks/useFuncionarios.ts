import { useContext } from "react"
import { FuncionariosContext } from "../contexts/FuncionariosContext"

export function useFuncionarios(){
  const {criarFuncionario, funcionarioState: {data, isLoading}, getFuncionarios} = useContext(FuncionariosContext);
  
  return {
    funcionarios: data,
    isLoading,
    criarFuncionario,
    getFuncionarios
  }
}