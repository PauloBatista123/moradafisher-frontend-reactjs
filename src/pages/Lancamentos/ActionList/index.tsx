import { Box, Button, Flex, Heading, Icon, Input, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { ActionFilter } from "../ActionFilter/Index";
import { ModalForm } from "../Modal";

export function ActionList(){
  const {isOpen, onClose, onOpen} = useDisclosure();

  return (
    <SimpleGrid>
      <Box
        padding={["2"]}
        shadow={"base"}
        borderRadius={"8"}
      >
        <Flex justify="space-between" align="center">
            <Heading size={"md"} fontWeight="normal" >Lançamentos</Heading>
            
          <Flex align="end">
            <ActionFilter />
            <Button onClick={onOpen} as="a" size={"lg"} fontSize="sm" colorScheme={"blue"} cursor={"pointer"} leftIcon={<Icon as={RiAddLine} onClick={onOpen} fontSize="20"></Icon>}>
                Novo
            </Button>
          </Flex>
          
        </Flex>
      </Box>
      <ModalForm 
        isOpen={isOpen}
        onClose={onClose}
      />
    </SimpleGrid>
  );
}