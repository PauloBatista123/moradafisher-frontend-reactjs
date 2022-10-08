import { Box, Button, Divider, Flex, Heading, Icon, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { RiAddLine } from "react-icons/ri";
import { ActionList } from "./ActionList";
import { Lista } from "./Lista";
import { ModalForm } from "./Modal";

export function Produtos(){
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