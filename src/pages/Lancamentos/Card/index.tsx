import { Box, Flex, Icon, Text, HStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IoMdExit } from "react-icons/io";
import { ImEnter, ImExit } from "react-icons/im";

interface CardProps {
  entradas: number;
  saidas: number;
}

export function Card({entradas, saidas}: CardProps){
  return (
    <HStack
      width={"100%"}
      justify="space-between"
      direction={"row"} 
    >
    <Box
      borderRadius={8}
      shadow={"lg"}
      bgGradient={`linear(to-r, teal.600, teal.600, teal.900)`}
      padding={"4"}
      color={"white"}
      fontWeight="bold"
      width={"100%"}
    >
      <Flex
        direction={"row"}
        justify="space-between"
      >
        <ImEnter size={30} />
        <Flex direction={"column"} justify={"end"} align={"end"}>
          <Text fontSize={"2xl"}>{entradas}</Text>
          <Text>Entradas</Text>
        </Flex>
      </Flex>
    </Box>
    <Box
      borderRadius={8}
      shadow={"lg"}
      bgGradient={`linear(to-r, red.800, red.800, red.900)`}
      padding={"4"}
      color={"white"}
      fontWeight="bold"
      width={"100%"}
    >
      <Flex
        direction={"row"}
        justify="space-between"
      >
        <ImExit size={30} />
        <Flex direction={"column"} justify={"end"} align={"end"}>
          <Text fontSize={"2xl"}>{saidas}</Text>
          <Text>Saídas</Text>
        </Flex>
      </Flex>
    </Box>
    </HStack>
  )
}