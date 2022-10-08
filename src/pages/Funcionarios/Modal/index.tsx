import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, SimpleGrid } from "@chakra-ui/react";
import { RiSave3Line } from "react-icons/ri";
import {useForm} from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/Form/Input";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/api";
import { queryClient } from "../../../services/queryCliente";
import { useToast } from "@chakra-ui/react";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// validação dos dados
const newFormValidation = zod.object({
  nome: zod.string({required_error: "Informe o nome"}).min(1, {message:"Informe o nome"}),
  cargo: zod.string({required_error: "Informe o cargo"}).min(1,  {message:"Informe o cargo"}),
});

//tipagem dos dados
type newFormData = zod.infer<typeof newFormValidation>;

export function ModalForm({isOpen, onClose}: ModalProps){
  const toast = useToast();
  const createFuncionario = useMutation(async (funcionario: newFormData) => {
    const response = await api.post('funcionarios/register', {...funcionario, usuario_id: 2});

    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['funcionarios']);
      toast({
        title: 'Sucesso!',
        description: `Lancamento adicionado com sucesso!`,
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

  //useform hook
  const newFormData = useForm<newFormData>({
    resolver: zodResolver(newFormValidation),
    defaultValues: { nome: undefined, cargo: undefined }
  });

  const {register, formState: {errors, isSubmitting}, handleSubmit, reset} = newFormData;
 

  function createFormFuncionario(data: newFormData) {
    createFuncionario.mutateAsync(data);
    onClose();
    reset();
  }

  return(
    <Drawer onClose={onClose} isOpen={isOpen} size={'xl'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Cadastrar novo Funcionário</DrawerHeader>
        
        <DrawerBody>
          <SimpleGrid spacing={["6","8"]} w={"100%"} columns={1}>
            <Input 
                type="text"
                id="nome"
                label="Nome"
                {...register("nome")}
                error={errors.nome}
                size={'lg'}
              />
              <Input
                type="text"
                id="cargo"
                label="Cargo"
                {...register("cargo")}
                error={errors.cargo}
                size={'lg'}
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
             onClick={handleSubmit(createFormFuncionario)}
             isLoading={isSubmitting}
             loadingText={"Enviando..."}
            >
              Salvar
            </Button>
          </Box>
        </DrawerFooter>  
      </DrawerContent>
    </Drawer>
  );
}