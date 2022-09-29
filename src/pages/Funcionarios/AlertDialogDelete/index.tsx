import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useRef } from 'react';
import { useMutation } from 'react-query';
import { api } from '../../../services/api';
import { queryClient } from '../../../services/queryCliente';
import { Funcionario } from '../../../utils/interfaces';

interface AlertDialogProps {
  mensagem: string;
  titulo: string;
  isOpen: boolean;
  onClose: () => void;
  funcionario: Funcionario;
}

export function AlertDialogDelete({mensagem, titulo, isOpen, funcionario, onClose}: AlertDialogProps) {
  
  const cancelRef = useRef<any>();
  const toast = useToast();
  const deletarFuncionario = useMutation(async (funcionario: Funcionario) => {
    const response = await api.delete(`funcionarios/${funcionario.id}`);

    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['funcionarios']);
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
  })

  function onDeleteFuncioanrio(funcionario: Funcionario){
    deletarFuncionario.mutateAsync(funcionario);
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      motionPreset='slideInBottom'
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {titulo} {funcionario?.nome}
          </AlertDialogHeader>

          <AlertDialogBody>
            {mensagem}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='red' ml={3} onClickCapture={() => {onDeleteFuncioanrio(funcionario); onClose()}} isLoading={deletarFuncionario.isLoading} loadingText={"Deletando..."}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}