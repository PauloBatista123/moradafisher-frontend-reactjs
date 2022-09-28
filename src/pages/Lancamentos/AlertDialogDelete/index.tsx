import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef, RefObject, useEffect, useContext } from 'react';
import { useFuncionarios } from '../../../hooks/useFuncionarios';
import { useLancamentos } from '../../../hooks/useLancamentos';
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
  const {deletarLancamento} = useLancamentos();

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
            <Button colorScheme='red' ml={3} onClickCapture={() => {deletarLancamento(lancamento); onClose()}} loadingText={"Deletando..."}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}