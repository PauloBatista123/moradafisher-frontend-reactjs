import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SidebarDrawerContextProps {
  children: ReactNode;
}

type SideareaDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SideareaDrawerContextData);

export function SidebarDrawerProvider({children}: SidebarDrawerContextProps){

  const disclosure = useDisclosure();
  const router = useLocation();

  //toda vez que trocar de rota o navigationdrawer vai fechar
  useEffect(() => {
    disclosure.onClose();
  }, [router.pathname])

  return(
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);