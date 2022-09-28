import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, SimpleGrid, Text } from '@chakra-ui/react'
import {useContext, useEffect, useState} from 'react'
import { api } from '../../../services/api';
import { AxiosResponse } from 'axios';
import { FormLabel } from '@chakra-ui/core';
import { RiCheckDoubleFill, RiCheckFill, RiSave3Line } from 'react-icons/ri';
import { BsCircle, BsCheckCircle } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { Funcionario } from '../../../utils/interfaces';
import { LancamentosContext } from '../../../contexts/LancamentosContext';
import { Input } from '../../../components/Form/Input';
import { Select } from '../../../components/Form/Select';
import { useFuncionarios } from '../../../hooks/useFuncionarios';
import { useLancamentos } from '../../../hooks/useLancamentos';
import { useProdutos } from '../../../hooks/useProdutos';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const newFormValidation = zod.object({
  peso: zod.number({invalid_type_error: "O tipo deve ser número"}).positive({message: "Informe um valor maior que 0"}),
  funcionario_id: zod.number({required_error: "O funcionário é obrigatório"}).positive({message: "O funcionário é obrigatório"}),
  produto_id: zod.number({required_error: "O produto é obrigatório"}).positive({message: "O produto é obrigatório"}),
  tipo: zod.string({invalid_type_error: "Selecione o tipo de entrada", description: "Selecione o tipo de entrada", }).min(1, {message: "Selecione o tipo de entrada"})
})

type newFormData = zod.infer<typeof newFormValidation>

export function ModalForm({isOpen, onClose}: ModalProps){

  const {funcionarios} = useFuncionarios();
  const {create} = useLancamentos();
  const {produtos} = useProdutos();

  const newFormLancamento = useForm<newFormData>({
    resolver: zodResolver(newFormValidation),
    defaultValues: {
      funcionario_id: undefined,
      peso: 0,
      tipo: undefined
    }
  })

  const {handleSubmit, register, formState: {errors}, setValue, watch, reset} = newFormLancamento;

  const optionsFuncionario = funcionarios.map(func => {
    return {
      value: func.id,
      optionText: func.nome,
    }
  });

  const optionsProdutos = produtos.map(produto => {
    return {
      value: produto.id,
      optionText: produto.nome,
    }
  });

  function createFormLancamento(data: newFormData){
    create(data)
    reset();
    onClose();
  }

  const tipo = watch("tipo");

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={'xl'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Cadastrar novo Lançamento</DrawerHeader>
        
        <DrawerBody>
          <SimpleGrid spacing={["6","8"]} w={"100%"} columns={1}>
            <Input
                type="number"
                id="peso"
                label="Peso (KG)"
                {...register("peso", {valueAsNumber: true})}
                error={errors.peso}
                size={'lg'}
              />
            <Select
              id='funcionario_id'
              label="Funcionário"
              options={
                optionsFuncionario
              }
              {...register("funcionario_id", {valueAsNumber: true})}
              error={errors.funcionario_id}
              size={'lg'}
              
            />
            <Select
              id='produto_id'
              label="Produto"
              options={
                optionsProdutos
              }
              {...register("produto_id", {valueAsNumber: true})}
              error={errors.produto_id}
              size={'lg'}
              
            />
          </SimpleGrid>
          <Divider borderColor={"gray.100"} mt={"8"} />

          <Text mt={2}>Escolha uma opção</Text>
          <SimpleGrid mt={"8"} spacing={["2","4"]} w={"100%"} columns={2}>
            <Button
                type='button'
                color={tipo === 'ENTRADA' ? 'white' : "blue.900"}
                bgColor={tipo === 'ENTRADA' ? 'blue.900' : "transparent"}
                size={'lg'}
                border={"1px"}
                _hover={{
                  bgColor: "blue.900",
                  color: "white"
                }}
                onClick={() => setValue("tipo", "ENTRADA")}
                leftIcon={tipo === 'ENTRADA' ? <BsCheckCircle /> : <BsCircle />}
              >
              Entrada
            </Button>
            <Button
                type='button'
                color={tipo === 'SAIDA' ? 'white' : "red.900"}
                bgColor={tipo === 'SAIDA' ? 'red.900' : "transparent"}
                size={'lg'}
                border={"1px"}
                _hover={{
                  bgColor: "red.900",
                  color: "white"
                }}
                onClick={() => setValue("tipo", "SAIDA")}
                leftIcon={tipo === 'SAIDA' ? <BsCheckCircle /> : <BsCircle />}
              >
              Saída
            </Button>
            <Input 
              hidden
              id='tipo'
              type={"tex"}
              {...register("tipo")}
              error={errors.tipo}
            />
          </SimpleGrid>
          
          <Divider borderColor={"gray.100"} mt={"8"} />

        </DrawerBody>     
        <DrawerFooter>
        <Box
            display={"flex"}
            flex={"1"}
            justifyContent={"flex-end"}
          >
          <Button
              variant={'outline'}
              borderColor={"gray.200"}
              size={'lg'}
              width={"50%"}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
             variant={'solid'}
             borderColor={"gray.200"}
             size={'lg'}
             width={"50%"}
             ml={"2"}
             bgColor={"blue.700"}
             color={"white"}
             _hover={{
              bgColor: "blue.500"
             }}
             rightIcon={
              <RiSave3Line />
             }
             onClick={handleSubmit(createFormLancamento)}
            >
              Salvar
            </Button>
          </Box>
        </DrawerFooter>  
      </DrawerContent>
    </Drawer>
  )
}