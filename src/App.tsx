import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { SidebarDrawerProvider } from "./contexts/SidebarDrawerContext";
import { Router } from "./pages/Router";
import { queryClient } from "./services/queryCliente";


export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SidebarDrawerProvider>
          <Router />
        </SidebarDrawerProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
