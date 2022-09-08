import { Box, Button, Divider, Flex, Heading, Icon, SimpleGrid } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { Lista } from "./Lista";

export function Funcionarios(){
  return(
    <SimpleGrid spacing={"10"} flex="1">
      <Box
        borderRadius={8}
        bg="whiteAlpha.100"
        p={["6","8"]}
        as="form"
        shadow={"base"}
      >
        <Flex justify="space-between" align="center">
          <Heading size={"md"} fontWeight="normal" >Funcionários</Heading>
          
          <Box>
            <Button as="a" size={"lg"} fontSize="sm" colorScheme={"blue"} cursor={"pointer"} leftIcon={<Icon as={RiAddLine} fontSize="20"></Icon>}>
                Novo
            </Button>
          </Box>
        </Flex>
        <Divider my={"6"} borderColor={"gray.100"}/>
        <Lista />
      </Box>

      {/* <ModalForm 
        isOpen={isOpen}
        onClose={onClose}
      /> */}
    </SimpleGrid>
  )
}