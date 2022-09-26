import { useContext } from "react"
import { FuncionariosContext } from "../contexts/FuncionariosContext"

export function useFuncionarios(){
  const {criarFuncionario, funcionarioState: {data, isLoading}, getFuncionarios, deleteFuncionario} = useContext(FuncionariosContext);
  
  if(data.length <= 0){
    getFuncionarios();
  }

  return {
    funcionarios: data,
    isLoading,
    criarFuncionario,
    getFuncionarios,
    deleteFuncionario
  }
}