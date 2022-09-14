export interface Funcionario {
  id: string;
  nome: string;
  cargo: string;
  status: "ATIVO" | "BLOQUEADO";
  usuario_id: number;
  created_at: Date;
  updated_at: Date;
  usuario: Usuario;
}

export interface Lancamento {
  id: string;
  peso: number;
  funcionario: Funcionario;
  type: 'entrada' | 'saida' | undefined;
  dataLancamento : string;
}

export type newLancamentoProps = {
  peso: number;
  funcionario: number;
  type: string;
}

export interface Produtos {
  id: number;
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