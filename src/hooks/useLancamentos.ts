import { useContext } from "react";
import { LancamentosContext } from "../contexts/LancamentosContext";

export function useLancamentos(){

  const {lancamentoState: {lancamentos}, createNewLancamento, loadLancamentos, deletarLancamento} = useContext(LancamentosContext);

  return {
    lancamentos,
    getLancamentos: loadLancamentos,
    create: createNewLancamento,
    deletarLancamento
  }
}