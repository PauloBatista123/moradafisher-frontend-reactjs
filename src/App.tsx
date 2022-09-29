import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { FuncionariosContextProvider } from "./contexts/FuncionariosContext";
import { LancamentosContextProvider } from "./contexts/LancamentosContext";
import { ProdutosContextProvider } from "./contexts/ProdutosContext";
import { SidebarDrawerProvider } from "./contexts/SidebarDrawerContext";
import { Router } from "./pages/Router";
import { queryClient } from "./services/queryCliente";


export function App() {
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <SidebarDrawerProvider>
        <ProdutosContextProvider>
          <FuncionariosContextProvider>
            <LancamentosContextProvider>
              <Router />
            </LancamentosContextProvider>
          </FuncionariosContextProvider>
        </ProdutosContextProvider>
      </SidebarDrawerProvider>
    </QueryClientProvider>
    </BrowserRouter>
  )
}
