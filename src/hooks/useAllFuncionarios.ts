import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../services/api";
import { Funcionario } from "../utils/interfaces";

interface GetAllFuncionariosReponse {
  funcionarios: Funcionario[]
}

export async function getAllFuncionarios(): Promise<GetAllFuncionariosReponse>{

  const response = await api.get("funcionarios", {
    params: {
      page: 0
    }
  });

  const funcionarios: Funcionario[] = response.data.data.map((funcionario: Funcionario) => {
    return {
      id: funcionario.id,
      nome: funcionario.nome,
      cargo: funcionario.cargo,
      usuario: funcionario.usuario,
      status: funcionario.status,
      usuario_id: funcionario.usuario_id,
      created_at: format(new Date(funcionario.created_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} ),
      updated_at: format(new Date(funcionario.updated_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} )
    }
  })

  return {
    funcionarios
  }
}

export function useAllFuncionarios(){
  return useQuery(['funcionarios'], async () => await getAllFuncionarios());
}