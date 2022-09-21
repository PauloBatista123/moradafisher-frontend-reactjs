import { BrowserRouter } from "react-router-dom";
import { FuncionariosContextProvider } from "./contexts/FuncionariosContext";
import { LancamentosContextProvider } from "./contexts/LancamentosContext";
import { ProdutosContextProvider } from "./contexts/ProdutosContext";
import { SidebarDrawerProvider } from "./contexts/SidebarDrawerContext";
import { Router } from "./pages/Router";

export function App() {
  return (
    <BrowserRouter>
      <SidebarDrawerProvider>
        <ProdutosContextProvider>
          <FuncionariosContextProvider>
            <LancamentosContextProvider>
              <Router />
            </LancamentosContextProvider>
          </FuncionariosContextProvider>
        </ProdutosContextProvider>
      </SidebarDrawerProvider>

    </BrowserRouter>
  )
}
