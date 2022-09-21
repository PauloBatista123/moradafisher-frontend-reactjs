import { useContext } from "react";
import { LancamentosContext } from "../contexts/LancamentosContext";

export function useLancamentos(){

  const {lancamentoState: {lancamentos}, createNewLancamento, loadLancamentos} = useContext(LancamentosContext);

  return {
    lancamentos,
    getLancamentos: loadLancamentos,
    create: createNewLancamento,
  }
}