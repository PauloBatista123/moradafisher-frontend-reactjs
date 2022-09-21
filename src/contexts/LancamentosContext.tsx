import { AxiosResponse } from 'axios';
import {createContext, ReactNode, useEffect, useReducer} from 'react'
import { createNewLancamentoAction, initialStateLancamentoAction, LancamentoStateData } from '../reducers/lancamentos/action';
import { LancamentoReducer } from '../reducers/lancamentos/reducer';
import { api } from '../services/api';
import { Lancamento, newLancamentoProps } from '../utils/interfaces';

interface LancamentosContextData {
  lancamentoState: LancamentoStateData,
  createNewLancamento: (newLancamento: newLancamentoProps) => void,
  loadLancamentos: () => void,
}

interface LancamentosContextProps {
  children: ReactNode
}

export const LancamentosContext = createContext({} as LancamentosContextData);

export function LancamentosContextProvider({children}: LancamentosContextProps){
  const [lancamentoState, dispatch] = useReducer(LancamentoReducer, {
    lancamentos: []
  })

  async function loadLancamentos(){
    const response = await api.get("lancamentos").then((response: AxiosResponse) => {
      dispatch(initialStateLancamentoAction(response.data));
    })
  }
    
  async function createNewLancamento(newLancamento: newLancamentoProps){
    const response = await api.post("lancamentos", newLancamento).then((response: AxiosResponse) => {
      dispatch(createNewLancamentoAction(response.data));
    })    
  }

  return (
    <LancamentosContext.Provider value={{ lancamentoState, createNewLancamento, loadLancamentos }}>
      {children}
    </LancamentosContext.Provider>
  )
}