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
import { Input } from "../../../components/Form/Input";
import { Select } from "../../../components/Form/Select";
import { useAllProdutos } from "../../../hooks/useAllProdutos";
import { useAllFuncionarios } from "../../../hooks/useAllFuncionarios";
import { useTransformSelectFuncionarios } from "../../../hooks/useTransformSelectFuncionarios";
import { useTransformSelectProdutos } from "../../../hooks/useTransformSelectProdutos";
import { IconButtonFilter } from "./IconButtonFilter";

export function ActionFilter(){
  const {isOpen, onClose, onOpen} = useDisclosure();
  const {register, getValues, setValue} = useFormContext();
  const { funcionarios } = useTransformSelectFuncionarios();
  const { produtos } = useTransformSelectProdutos();

  const existsFilter = getValues(["filtra_funcionario", "filtra_produto", "filtra_tipo"]);

  const OPTIONS_TIPO = [
    {value: "ENTRADA", optionText: "ENTRADA"}, {value: "SAIDA", optionText: "SAIDA"}
  ]

  function limparFiltro(){
    setValue("filtra_funcionario", undefined);
    setValue("filtra_produto", undefined);
    setValue("filtra_tipo", undefined);
  }

  return (
    <Fragment>
      <IconButtonFilter 
        limparFiltro={limparFiltro}
        existsFilter={existsFilter}
      />
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
          <DrawerHeader>Filtrar Lancamentos</DrawerHeader>

          <DrawerBody>
            <Stack
              spacing={"2"}
            >
                <Select
                  label="Funcionário:"
                  {...register('filtra_funcionario')}
                  options={
                    funcionarios
                  }
                />
                <Select
                  label="Produto:"
                  {...register('filtra_produto')}
                  options={
                    produtos
                  }
                />
                <Select
                  label="Tipo de Lançamento:"
                  {...register('filtra_tipo')}
                  options={
                    OPTIONS_TIPO
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