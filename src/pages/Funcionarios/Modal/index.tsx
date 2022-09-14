import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, SimpleGrid } from "@chakra-ui/react";
import { RiSave3Line } from "react-icons/ri";
import {useForm} from 'react-hook-form';
import * as zod from 'zod';
import { TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { FuncionariosContext } from "../../../contexts/FuncionariosContext";
import { Input } from "../../../components/Form/Input";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// validação dos dados
const newFormValidation = zod.object({
  nome: zod.string({required_error: "Informe o nome"}).min(1, {message:"Informe o nome"}),
  cargo: zod.string({required_error: "Informe o cargo"}).min(1,  {message:"Informe o nome"}),
});

//tipagem dos dados
type newFormData = zod.infer<typeof newFormValidation>;

export function ModalForm({isOpen, onClose}: ModalProps){

  //useform hook
  const newFormData = useForm<newFormData>({
    resolver: zodResolver(newFormValidation),
    defaultValues: { nome: undefined, cargo: undefined }
  });

  const {register, formState: {errors}, handleSubmit} = newFormData;
  const {funcionarioState: {isLoading}} = useContext(FuncionariosContext);

  function createFormFuncionario(data: newFormData) {

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
             isLoading={isLoading}
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