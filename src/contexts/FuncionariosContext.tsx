import { Axios, AxiosResponse } from "axios";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import { criarFuncionarioAction, initialStateFuncionarios } from "../reducers/funcionarios/actions";
import { funcionariosReducer } from "../reducers/funcionarios/reducer";
import { api } from "../services/api";
import {Funcionario} from "../utils/interfaces";

export interface FuncionarioState {
  data: Funcionario[];
  isLoading: boolean;
}

interface FuncionariosContextData {
  funcionarioState: FuncionarioState;
  criarFuncionario: (data: newFuncionarioProps) => void;
}

interface newFuncionarioProps {
  nome: string;
  cargo: string;
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
  }, []);

  async function criarFuncionario({nome, cargo}: newFuncionarioProps){
    const response = await api.post("funcionarios", {nome, cargo, usuario_id: 2}).then((response: AxiosResponse) => {
      dispatch(criarFuncionarioAction(response.data))
    });
  }

  return(
    <FuncionariosContext.Provider value={{ funcionarioState, criarFuncionario }}>
      {children}
    </FuncionariosContext.Provider>
  )
}