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
import { useMutation } from '@tanstack/react-query';
import { useRef, RefObject, useEffect, useContext } from 'react';
import { useFuncionarios } from '../../../hooks/useFuncionarios';
import { useLancamentos } from '../../../hooks/useLancamentos';
import { api } from '../../../services/api';
import { queryClient } from '../../../services/queryCliente';
import { Lancamento } from '../../../utils/interfaces';

interface AlertDialogProps {
  mensagem: string;
  titulo: string;
  isOpen: boolean;
  onClose: () => void;
  lancamento: Lancamento;
}

export function AlertDialogDelete({mensagem, titulo, isOpen, lancamento, onClose}: AlertDialogProps) {
  
  const cancelRef = useRef<any>();
  const toast = useToast();
  const deletarLancamento = useMutation(async (lancamento: Lancamento) => {
    const response = await api.delete(`lancamentos/${lancamento.id}`);

    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['lancamentos']);
      toast({
        title: 'Sucesso!',
        description: `Lancamento deletado com sucesso!`,
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

  function onDeletarLancamento(lancamento: Lancamento){
    deletarLancamento.mutateAsync(lancamento);
    onClose();
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
            {titulo} {lancamento?.id}
          </AlertDialogHeader>

          <AlertDialogBody>
            {mensagem}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='red' ml={3} onClickCapture={() => {onDeletarLancamento(lancamento)}} isLoading={deletarLancamento.isLoading} loadingText={"Deletando..."}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}