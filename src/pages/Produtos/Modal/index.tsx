import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, SimpleGrid } from '@chakra-ui/react'
import { Input } from '../../../components/Form/Input';
import {useContext} from 'react'
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { RiSave3Line } from 'react-icons/ri';
import { ProdutosContext } from '../../../contexts/ProdutosContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const newFormValidation = zod.object({
  nome: zod.string({invalid_type_error: "O nome é obrigatório"}).min(1, {message: "O nome é obrigatório"}),
  unidade: zod.string({required_error: "A unidade é obrigatório"}).min(1, {message: "A unidade é obrigatório"}),
})

type newFormData = zod.infer<typeof newFormValidation>

export function ModalForm({isOpen, onClose}: ModalProps){

  const {criarNovoProduto, produtoState: {isLoading} } = useContext(ProdutosContext);

  const newFormLancamento = useForm<newFormData>({
    resolver: zodResolver(newFormValidation),
    defaultValues: {
      nome: undefined,
      unidade: undefined
    }
  })

  const {handleSubmit, register, formState: {errors}, reset} = newFormLancamento;

  function createFormProduto(data: newFormData){
    criarNovoProduto(data)
    reset();
    onClose();
  }

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={'xl'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Cadastrar novo Produto</DrawerHeader>
        
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
                id="unidade"
                label="Unidade"
                {...register("unidade")}
                error={errors.unidade}
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
             onClick={handleSubmit(createFormProduto)}
             isLoading={isLoading}
             loadingText={"Enviando..."}
            >
              Salvar
            </Button>
          </Box>
        </DrawerFooter>  
      </DrawerContent>
    </Drawer>
  )
}