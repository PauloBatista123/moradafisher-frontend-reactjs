import { AxiosError, AxiosResponse } from "axios";
import { ReactNode, useCallback, useEffect, useReducer } from "react";
import { criarNovoProdutoAction, deletarProdutoAction, initialStateProdutosAction, isLoadingAppAction, isNotLoadingAppAction, ProdutosData } from "../reducers/produtos/action";
import { ProdutosReducer } from "../reducers/produtos/reducer";
import { api } from "../services/api";
import { useToast } from "@chakra-ui/react";
import { createContext } from "use-context-selector";

export interface ProdutosContextData {
  produtoState: ProdutosData;
  criarNovoProduto: (data: newFormProdutoData) => void;
  deletarProduto: (id: string) => void;
  getProdutos: () => void;
}

interface ProdutosContextProviderProps {
  children: ReactNode;
}

interface newFormProdutoData {
  nome: string; 
  unidade: string;
}

interface errorAxios {
  response: {
    data: {
      error: string;
      status: boolean;
      statusCode: number;
    }
  },
  message: string;
}

export const ProdutosContext = createContext({} as ProdutosContextData);

export function ProdutosContextProvider({children}: ProdutosContextProviderProps){
  const toast = useToast();
  const [produtoState, dispatch] = useReducer(ProdutosReducer, {
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    getProdutos();
  }, []);

  const getProdutos = async () => {
    const response = await api.get("produtos").then((response: AxiosResponse) => {
      dispatch(initialStateProdutosAction(response.data));
      console.log(response.data);
    });
    console.log(response);
  };

  const criarNovoProduto = useCallback(async ({nome, unidade}: newFormProdutoData) => {
    dispatch(isLoadingAppAction());

    const response = await api.post("produtos/register", { nome, unidade, usuario_id: 2 }).then((response: AxiosResponse) => {
      dispatch(criarNovoProdutoAction(response.data));
      toast({
        title: 'Produto criado com sucesso',
        description: `${response.data.data.nome} disponível na lista`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
    }).catch((error: AxiosError) => {
      
      toast({
        title: 'Erro na requisição',
        description: `${error.message}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
    });

  },[]);

  const deletarProduto = useCallback(async (id: string) => {
    dispatch(isLoadingAppAction());
    
    const response = await api.delete(`produtos/${id}`).then((response: AxiosResponse) => {
      dispatch(deletarProdutoAction(Number(id)));
      toast({
        title: 'Produto deletado com sucesso',
        description: `Produto removido da lista`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
    }).catch((error: errorAxios) => {
      toast({
        title: 'Erro na requisição',
        description: `${error.message} - ${error.response.data.error}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })

      dispatch(isNotLoadingAppAction());
    });
  },[]);

  return(
    <ProdutosContext.Provider value={{ produtoState, criarNovoProduto, deletarProduto, getProdutos }}>
      {children}
    </ProdutosContext.Provider>
  )
}