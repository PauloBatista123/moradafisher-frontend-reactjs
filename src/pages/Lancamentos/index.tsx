import { Box, Button, Divider, Flex, Heading, Icon, SimpleGrid, useDisclosure, VStack } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { ListaLancamentos } from "./ListaLancamentos";
import { ModalForm } from "./Modal";

export function Lancamentos(){
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <SimpleGrid spacing={"10"} flex="1">
      <Box
        borderRadius={8}
        bg="whiteAlpha.100"
        p={["6","8"]}
        as="form"
        shadow={"base"}
      >
        <Flex justify="space-between" align="center">
          <Heading size={"md"} fontWeight="normal" >Lançamentos</Heading>
          
          <Box>
            <Button as="a" size={"lg"} fontSize="sm" colorScheme={"blue"} cursor={"pointer"} onClick={onOpen} leftIcon={<Icon as={RiAddLine} fontSize="20"></Icon>}>
                Novo
            </Button>
          </Box>
        </Flex>
        <Divider my={"6"} borderColor={"gray.100"}/>
        <ListaLancamentos />
      </Box>

      <ModalForm isOpen={isOpen} onClose={onClose}/>
    </SimpleGrid>
      
  )
}