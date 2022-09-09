import { createContext, ReactNode, useReducer } from "react";
import { funcionariosReducer } from "../reducers/funcionarios/reducer";
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

  return(
    <FuncionariosContext.Provider value={{ funcionarioState }}>
      {children}
    </FuncionariosContext.Provider>
  )
}