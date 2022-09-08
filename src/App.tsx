import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LancamentosContextProvider } from "./contexts/LancamentosContext";
import { ProdutosContextProvider } from "./contexts/ProdutosContext";
import { SidebarDrawerProvider } from "./contexts/SidebarDrawerContext";
import { Router } from "./pages/Router";

export function App() {
  return (
    <BrowserRouter>
      <SidebarDrawerProvider>
        {/* <LancamentosContextProvider> */}
          <ProdutosContextProvider>
          <Router />
          </ProdutosContextProvider>
        {/* </LancamentosContextProvider> */}
      </SidebarDrawerProvider>

    </BrowserRouter>
  )
}
