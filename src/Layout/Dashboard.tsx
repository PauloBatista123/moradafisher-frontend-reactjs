import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export function Dashboard(){
  return (
    <Flex direction="column" h="100%">
      <Header />

      <Flex w="100%" my="4" px="2">
        <Sidebar />
        <Outlet />
      </Flex>
    </Flex>
  )
}