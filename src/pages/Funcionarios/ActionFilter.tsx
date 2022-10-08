import { Box, Button, Fade, FormControl, FormLabel, Icon, IconButton, Stack, useDisclosure } from "@chakra-ui/react";
import { Fragment } from "react";
import { RiAddLine, RiFilter2Fill, RiFilterOffLine } from "react-icons/ri";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { useFormContext } from "react-hook-form";
import { Input } from "../../components/Form/Input";
import { Select } from "../../components/Form/Select";


export function ActionFilter(){
  const {isOpen, onClose, onOpen} = useDisclosure();
  const {register, getValues, setValue} = useFormContext();
  const is_filter = getValues("filtra_nome");
  const OPTIONS_ORDEM = [
    {value: "nome", optionText: "NOME"}, {value: "status", optionText: "STATUS"}, {value: "created_at", optionText: "DATA DE CRIAÇÃO"}
  ]

  const limparFiltro = () => {
    setValue("filtra_nome", null);
  }

  return (
    <Fragment>
      {is_filter && (
        <IconButton aria-label='Limpar' onClick={limparFiltro} as="a" size={"lg"} fontSize="sm" colorScheme={"gray"} cursor={"pointer"} mr={"2"} icon={<RiFilterOffLine />}></IconButton>
      )}
      <Button onClick={onOpen} as="a" size={"lg"} fontSize="sm" colorScheme={"gray"} cursor={"pointer"} mr={"2"} leftIcon={<Icon as={RiFilter2Fill} onClick={onOpen} fontSize="20"></Icon>}>
          Filtrar
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='bottom'
        onClose={onClose}
        size={"xl"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filtrar funcionários</DrawerHeader>

          <DrawerBody>
            <Stack
              spacing={"2"}
            >
              <Input
                  type="text"
                  label="Nome:"
                  {...register('filtra_nome')}
                  placeholder='Pesquisar nome...' />
                <Select
                  label="Ordenar por:"
                  {...register('filtra_ordem')}
                  options={
                    OPTIONS_ORDEM
                  }
                />
            </Stack>
              
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Fechar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      
    </Fragment>
  )

}