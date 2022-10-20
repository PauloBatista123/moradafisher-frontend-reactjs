import { Box, Button, Divider, Flex, Heading, Icon, SimpleGrid, useDisclosure, VStack } from "@chakra-ui/react";
import { ActionList } from "./ActionList";
import { FormProvider, useForm } from "react-hook-form";
import { ListaLancamentos } from "./ListaLancamentos";

export function Lancamentos(){
  const forms = useForm();

  return (
    <SimpleGrid flex="1">
      <FormProvider {...forms}>
        <ActionList />
        <Box
          borderRadius={8}
          bg="whiteAlpha.100"
          p={["6","8"]}
          as="form"
          shadow={"base"}
        >        
          <ListaLancamentos />
        </Box>
      </FormProvider>
    </SimpleGrid>
      
  )
}