import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../Layout/Dashboard";
import { Funcionarios } from "./Funcionarios";
import { Lancamentos } from "./Lancamentos";
import { Produtos } from "./Produtos";

export function Router(){
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="/lancamentos" element={<Lancamentos />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
      </Route>
    </Routes>
  )
}