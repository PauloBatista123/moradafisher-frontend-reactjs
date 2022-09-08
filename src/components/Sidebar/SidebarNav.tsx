import { Stack } from "@chakra-ui/react";
import { RiAddBoxFill, RiBookMarkLine, RiContactsLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav(){
  return (
    <Stack spacing="12" align="flex-start">
        <NavSection title="GERAL">
          <NavLink icon={RiAddBoxFill} href="/lancamentos" children="Lançamentos" />
          <NavLink icon={RiBookMarkLine} href="/produtos" children="Produtos" />
        </NavSection>
        <NavSection title="AUTOMAÇÃO">
          <NavLink icon={RiInputMethodLine} href="/dash" children="Dashboard" />
          <NavLink icon={RiContactsLine} href="/users" children="Usuários" />
        </NavSection>        
      </Stack>
  )
}