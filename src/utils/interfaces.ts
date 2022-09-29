export interface Funcionario {
  id: string;
  nome: string;
  cargo: string;
  status: "ATIVO" | "BLOQUEADO";
  usuario_id: number;
  created_at: string;
  updated_at: string;
  usuario: Usuario;
}

export interface Lancamento {
  id: string;
  peso: string;
  funcionario: Funcionario;
  tipo: 'ENTRADA' | 'SAIDA' | undefined;
  created_at : string;
  updated_at : string;
  usuario: Usuario;
  produto: Produtos;
}

export type newLancamentoProps = {
  peso: number;
  funcionario_id: number;
  produto_id: number;
  tipo: string;
}

export interface Produtos {
  id: string;
  nome: string;
  status: "INATIVO" | "ATIVO";
  unidade: string;
  usuario_id: number;
  created_at: Date;
  updated_at: Date;
  usuario: Usuario;
}

export interface Usuario {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface errorAxios {
  response: {
    data: {
      error: string;
      status: boolean;
      statusCode: number;
    }
  },
  message: string;
}