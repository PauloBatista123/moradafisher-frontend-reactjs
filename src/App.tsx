import { BrowserRouter } from "react-router-dom";
import { FuncionariosContextProvider } from "./contexts/FuncionariosContext";
import { ProdutosContextProvider } from "./contexts/ProdutosContext";
import { SidebarDrawerProvider } from "./contexts/SidebarDrawerContext";
import { Router } from "./pages/Router";

export function App() {
  return (
    <BrowserRouter>
      <SidebarDrawerProvider>
        <ProdutosContextProvider>
          <FuncionariosContextProvider>
            <Router />
          </FuncionariosContextProvider>
        </ProdutosContextProvider>
      </SidebarDrawerProvider>

    </BrowserRouter>
  )
}
