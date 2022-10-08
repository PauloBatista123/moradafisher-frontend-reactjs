import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../services/api";
import { Produtos } from "../utils/interfaces"

interface GetAllResponseProdutos {
  produtos: Produtos[];
}

export async function getAllProdutos(): Promise<GetAllResponseProdutos>{

  const response = await api.get("produtos", {
    params: {
      page: 0
    }
  });

  const produtos: Produtos[] = response.data.data.map((produto: Produtos) => {
    return {
      id: produto.id,
      nome: produto.nome,
      unidade: produto.unidade,
      usuario: produto.usuario,
      status: produto.status,
      usuario_id: produto.usuario_id,
      created_at: format(new Date(produto.created_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} ),
      updated_at: format(new Date(produto.updated_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} )
    }
  })

  return {
    produtos
  }
}

export function useAllProdutos(){
  return useQuery(['all-produtos'], async () => await getAllProdutos());
}