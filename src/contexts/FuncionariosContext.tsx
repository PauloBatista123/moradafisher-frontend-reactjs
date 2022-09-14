import { Axios, AxiosResponse } from "axios";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import { initialStateFuncionarios } from "../reducers/funcionarios/actions";
import { funcionariosReducer } from "../reducers/funcionarios/reducer";
import { api } from "../services/api";
import {Funcionario} from "../utils/interfaces";

export interface FuncionarioState {
  data: Funcionario[];
  isLoading: boolean;
}

interface FuncionariosContextData {
  funcionarioState: FuncionarioState
}

interface FuncionariosContextProviderProps {
  children: ReactNode
}

export const FuncionariosContext = createContext({} as FuncionariosContextData);

export function FuncionariosContextProvider({children}: FuncionariosContextProviderProps){
  
  const [funcionarioState, dispatch] = useReducer(funcionariosReducer, {
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    (
      async () => {
        const response = await api.get("funcionarios").then((response: AxiosResponse<{ data: Funcionario[] }>) => {
          dispatch(initialStateFuncionarios(response.data.data));
        });
      }
    )()
  }, [])

  return(
    <FuncionariosContext.Provider value={{ funcionarioState }}>
      {children}
    </FuncionariosContext.Provider>
  )
}