import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { LancamentosContext } from "../contexts/LancamentosContext";
import { api } from "../services/api";
import { Lancamento } from "../utils/interfaces";


interface GetLancamentosResponse {
  data: Lancamento[],
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  }
}

export async function getLancamentos(page: number): Promise<GetLancamentosResponse> {

  const response = await api.get('lancamentos', {
    params: {
      page
    }
  });

  const data: Lancamento[] = response.data.data.map((lancamento: Lancamento) => {
    return {
      id: lancamento.id,
      produto_id: lancamento.produto.id,
      funcionario_id: lancamento.funcionario.id,
      usuario_id: lancamento.usuario.id,
      peso: lancamento.peso,
      tipo: lancamento.tipo,
      usuario: lancamento.usuario,
      funcionario: lancamento.funcionario,
      produto: lancamento.produto,
      created_at: format(new Date(lancamento.created_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} ),
      updated_at: format(new Date(lancamento.updated_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} )
    }
  })

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

export function useLancamentos(page: number){
  return useQuery(['lancamentos', page], async () => await getLancamentos(page));
}