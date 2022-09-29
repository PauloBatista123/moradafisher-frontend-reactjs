import { Funcionario } from "../utils/interfaces";
import { api } from "../services/api";
import { useQuery } from "react-query";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface GetFuncionariosResponse {
  data: Funcionario[],
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  }
}

export async function getFuncionarios(page: number): Promise<GetFuncionariosResponse> {
  
  const response = await api.get('funcionarios', {
    params: {
      page
    }
  });

  const data: Funcionario[] = response.data.data.map((funcionario: Funcionario) => {
    return {
      id: funcionario.id,
      nome: funcionario.nome,
      cargo: funcionario.cargo,
      usuario: funcionario.usuario,
      status: funcionario.status,
      usuario_id: funcionario.usuario_id,
      created_at: format(new Date(funcionario.created_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} ),
      updated_at: format(new Date(funcionario.updated_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} )
    };
  });

  const meta = {
    current_page: response.data.meta.current_page,
    last_page: response.data.meta.last_page,
    per_page: response.data.meta.per_page,
    to: response.data.meta.to,
    total: response.data.meta.total,
  }

  return {
    data,
    meta
  }
}

export function useFuncionarios(page: number){
  return useQuery(['funcionarios', page], async () => await getFuncionarios(page));
}