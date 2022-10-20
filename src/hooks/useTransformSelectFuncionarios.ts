import { useAllFuncionarios } from "./useAllFuncionarios";

export function useTransformSelectFuncionarios(){
  const {data} = useAllFuncionarios();

  const funcionarios = data?.funcionarios.map(funcionario => {
    return {
      value: funcionario.id,
      optionText: funcionario.nome,
    }
  });

  return {
    funcionarios
  }
}