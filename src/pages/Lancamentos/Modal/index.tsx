import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, SimpleGrid, Text, useToast } from '@chakra-ui/react'
import { RiSave3Line } from 'react-icons/ri';
import { BsCircle, BsCheckCircle } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { Input } from '../../../components/Form/Input';
import { Select } from '../../../components/Form/Select';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Lancamento, Produtos } from '../../../utils/interfaces';
import { useProdutos } from '../../../hooks/useProdutos';
import { useAllProdutos } from '../../../hooks/useAllProdutos';
import { useAllFuncionarios } from '../../../hooks/useAllFuncionarios';
import { api } from '../../../services/api';
import { queryClient } from '../../../services/queryCliente';

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

  const queryProdutos = useAllProdutos();
  const queryFuncionarios = useAllFuncionarios();
  const toast = useToast();
  const createLancamento = useMutation(async (lancamento: newFormData) => {
    const response = await api.post('lancamentos/register', {...lancamento, usuario_id: 2});

    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['lancamentos']);
      toast({
        title: 'Sucesso!',
        description: `Funcionario adicionado com sucesso!`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
    },
    onError: (err: Error) => {
      toast({
        title: 'Erro!',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
    }
  });

  const newFormLancamento = useForm<newFormData>({
    resolver: zodResolver(newFormValidation),
    defaultValues: {
      funcionario_id: undefined,
      peso: 0,
      tipo: undefined
    }
  })

  const {handleSubmit, register, formState: {errors}, setValue, watch, reset} = newFormLancamento;

  const optionsFuncionario = queryFuncionarios.data?.funcionarios.map(func => {
    return {
      value: func.id,
      optionText: func.nome,
    }
  });

  const optionsProdutos = queryProdutos.data?.produtos.map(produto => {
    return {
      value: produto.id,
      optionText: produto.nome,
    }
  });

  function createFormLancamento(data: newFormData){
    createLancamento.mutateAsync(data);
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

            {queryProdutos.isLoading ? <Text>Carregando dados...</Text> : (
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
            )}
            
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