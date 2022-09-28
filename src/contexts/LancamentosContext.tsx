import { useToast } from '@chakra-ui/react';
import { AxiosError, AxiosResponse } from 'axios';
import {createContext, ReactNode, useEffect, useReducer} from 'react'
import { createNewLancamentoAction, deletarLancamentoAction, initialStateLancamentoAction, LancamentoStateData } from '../reducers/lancamentos/action';
import { LancamentoReducer } from '../reducers/lancamentos/reducer';
import { api } from '../services/api';
import { errorAxios, Lancamento, newLancamentoProps } from '../utils/interfaces';

interface LancamentosContextData {
  lancamentoState: LancamentoStateData,
  createNewLancamento: (newLancamento: newLancamentoProps) => void,
  loadLancamentos: () => void,
  deletarLancamento: (lancamento: Lancamento) => void,
}

interface LancamentosContextProps {
  children: ReactNode
}

export const LancamentosContext = createContext({} as LancamentosContextData);

export function LancamentosContextProvider({children}: LancamentosContextProps){

  const toast = useToast();
  const [lancamentoState, dispatch] = useReducer(LancamentoReducer, {
    lancamentos: []
  });

  useEffect(() => {
    if(lancamentoState.lancamentos.length === 0){
      loadLancamentos();
    }
  }, []);

  async function loadLancamentos(){
    const response = await api.get("lancamentos").then((response: AxiosResponse) => {
      dispatch(initialStateLancamentoAction(response.data.data));
    })
  }
    
  async function createNewLancamento({funcionario_id, peso, produto_id, tipo}: newLancamentoProps){
    const response = await api.post("lancamentos/register", {funcionario_id, peso, produto_id, tipo, usuario_id: 2}).then((response: AxiosResponse) => {
      dispatch(createNewLancamentoAction(response.data.data));
    })    
  }

  async function deletarLancamento(lancamento: Lancamento){
    const response = await api.delete(`lancamentos/${lancamento?.id}`).then((response: AxiosResponse) => {
        dispatch(deletarLancamentoAction(lancamento));
        toast({
          title: 'Sucesso!',
          description: `${lancamento.id} deletado com sucesso!`,
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: "top-right",
        })
    }).catch((error: AxiosError<errorAxios>) => {
      toast({
        title: 'Erro na requisição',
        description: `${error.message} - ${error.response?.data.message}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
    });
  }

  return (
    <LancamentosContext.Provider value={{ lancamentoState, createNewLancamento, loadLancamentos, deletarLancamento }}>
      {children}
    </LancamentosContext.Provider>
  )
}