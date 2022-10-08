import { Box, Button, Divider, Flex, Heading, Icon, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { ActionList } from "./ActionList";
import { Lista } from "./Lista";

export function Funcionarios(){
  const forms = useForm();

  return(
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
          <Lista />
        </Box>
      </FormProvider>
    </SimpleGrid>
  )
}