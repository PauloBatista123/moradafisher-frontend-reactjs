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
import { Funcionario, Produtos } from '../../../utils/interfaces';

interface AlertDialogProps {
  mensagem: string;
  titulo: string;
  isOpen: boolean;
  onClose: () => void;
  funcionario: Funcionario;
}

export function AlertDialogDelete({mensagem, titulo, isOpen, funcionario, onClose}: AlertDialogProps) {
  
  const cancelRef = useRef<any>();
  const {deleteFuncionario, isLoading} = useFuncionarios();

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
            <Button colorScheme='red' ml={3} onClickCapture={() => {deleteFuncionario(funcionario); onClose()}} isLoading={isLoading} loadingText={"Deletando..."}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}