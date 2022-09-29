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
import { useRef, RefObject, useEffect, useContext } from 'react';
import { useMutation } from 'react-query';
import { ProdutosContext } from '../../../contexts/ProdutosContext';
import { useProdutos } from '../../../hooks/useProdutos';
import { api } from '../../../services/api';
import { queryClient } from '../../../services/queryCliente';
import { Produtos } from '../../../utils/interfaces';

interface AlertDialogProps {
  mensagem: string;
  titulo: string;
  isOpen: boolean;
  onClose: () => void;
  produto: Produtos | undefined;
}

export function AlertDialogDelete({mensagem, titulo, isOpen, produto, onClose}: AlertDialogProps) {
  
  const toast = useToast();
  const cancelRef = useRef<any>();
  const deletarProduto = useMutation(async (produtoId: string) => {
    const response = await api.delete(`produtos/${produtoId}`);
    return response;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['produtos']);
      toast({
        title: 'Sucesso!',
        description: `Produto deletado com sucesso!`,
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
  
  function onDeletarProduto(produtoId: string){
    deletarProduto.mutateAsync(produtoId);
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
            {titulo} {produto?.nome}
          </AlertDialogHeader>

          <AlertDialogBody>
            {mensagem}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='red' ml={3} onClickCapture={() => {onDeletarProduto(String(produto?.id)), onClose()}} isLoading={deletarProduto.isLoading} loadingText={"Deletando..."}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}