import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useQuery } from "react-query";
import { api } from "../services/api";
import { Produtos } from "../utils/interfaces";

interface GetProdutosResponse {
  data: Produtos[],
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  }
}

export async function getProdutos(page: number): Promise<GetProdutosResponse> {
  
  const response = await api.get('produtos', {
    params: {
      page
    }
  });

  const data: Produtos[] = response.data.data.map((produto: Produtos) => {
    return {
      id: produto.id,
      nome: produto.nome,
      unidade: produto.unidade,
      usuario: produto.usuario,
      status: produto.status,
      usuario_id: produto.usuario_id,
      created_at: format(new Date(produto.created_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} ),
      updated_at: format(new Date(produto.updated_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} )
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

export function useProdutos(page: number){
  return useQuery(['produtos', page], async () => await getProdutos(page));
}