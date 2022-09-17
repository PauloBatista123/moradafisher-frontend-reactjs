import { useToast } from "@chakra-ui/react";
import { Axios, AxiosError, AxiosResponse } from "axios";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import { criarFuncionarioAction, deletarFuncionarioAction, initialStateFuncionarios } from "../reducers/funcionarios/actions";
import { funcionariosReducer } from "../reducers/funcionarios/reducer";
import { api } from "../services/api";
import {Funcionario} from "../utils/interfaces";

interface AxiosErrorResponse {
  message: string;
}

export interface FuncionarioState {
  data: Funcionario[];
  isLoading: boolean;
}

interface FuncionariosContextData {
  funcionarioState: FuncionarioState;
  criarFuncionario: (data: newFuncionarioProps) => void;
  getFuncionarios: () => void;
  deleteFuncionario: (data: Funcionario) => void;
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
  
  const toast = useToast();
  const [funcionarioState, dispatch] = useReducer(funcionariosReducer, {
    data: [],
    isLoading: true,
  });

  async function getFuncionarios(){
    const response = await api.get("funcionarios").then((response: AxiosResponse<{ data: Funcionario[] }>) => {
      dispatch(initialStateFuncionarios(response.data.data));
    }).catch((error: AxiosError<AxiosErrorResponse>) => {
      console.log(error);
      toast({
        title: 'Erro na requisição',
        description: `${error.message} - ${error.response?.data.message}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
    });;
  }
  
  async function criarFuncionario({nome, cargo}: newFuncionarioProps){
    const response = await api.post("funcionarios/register", {nome, cargo, usuario_id: 2}).then((response: AxiosResponse) => {
      dispatch(criarFuncionarioAction(response.data))
      toast({
        title: 'Sucesso!',
        description: `${nome} adicionado com sucesso!`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
    }).catch((error: AxiosError<AxiosErrorResponse>) => {
      console.log(error);
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

  async function deleteFuncionario(funcionario: Funcionario){
    const response = await api.delete(`funcionarios/${funcionario?.id}`).then((response: AxiosResponse) => {
        dispatch(deletarFuncionarioAction(funcionario));
        toast({
          title: 'Sucesso!',
          description: `${funcionario.nome} deletado com sucesso!`,
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: "top-right",
        })
    }).catch((error: AxiosError<AxiosErrorResponse>) => {
      console.log(error);
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

  return(
    <FuncionariosContext.Provider value={{ funcionarioState, criarFuncionario, getFuncionarios, deleteFuncionario }}>
      {children}
    </FuncionariosContext.Provider>
  )
}