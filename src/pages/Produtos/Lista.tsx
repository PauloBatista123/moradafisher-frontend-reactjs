import { Badge, Button, Flex, IconButton, Skeleton, SkeletonText, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Fragment, useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useProdutos } from "../../hooks/useProdutos";
import { Produtos } from "../../utils/interfaces";
import { AlertDialogDelete } from "./AlertDialogDelete";
import { SkeletonLista } from "./SkeletonLista";

export function Lista() {

  const {produtos, getProdutos, isLoading} = useProdutos();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [produtoDelete, setProdutoDelete] = useState<Produtos | undefined>(undefined);

  useEffect(() => {
    getProdutos();
  }, [])

  if(isLoading){
    return (
      <SkeletonLista />  
    )
  }

  return (

    <Fragment>
      <AlertDialogDelete 
        isOpen={isOpen}
        mensagem={"Deseja deletar o produto?"}
        onClose={onClose}
        titulo={"Deletar Produto"}
        produto={produtoDelete}
        key={"deletar-produto"}
      />
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Produto</Th>
            <Th>Status</Th>
            <Th>Alteração</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
        
          {
            produtos.map((produto) => (
              <Tr 
              _hover={{
                bgColor: "blackAlpha.50"
              }}
              key={produto.id}
              >
                <Td>
                  <Flex direction={"column"}>
                    <Text fontWeight={"bold"} fontSize={"lg"}>
                      {produto.nome}
                    </Text>
                    <Text>
                      Medida: {produto.unidade}
                    </Text>
                  </Flex>
                </Td>
                <Td>
                    <Badge colorScheme={produto.status === 'INATIVO' ? 'red' : 'green'} fontWeight={"bold"} fontSize={"sm"} padding={"8px"} borderRadius={"6px"}>
                      {produto.status}
                    </Badge>
                </Td>
                <Td>
                  <Flex direction={"column"}>
                    <Text>
                      Última alteração {format(new Date(produto.updated_at), "d 'de' MMM 'às' hh:mm", { locale: ptBR} )}
                    </Text>
                    <Text color={"gray.500"} fontSize={"sm"}>
                      Criando em {format(new Date(produto.created_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} )}
                    </Text>
                  </Flex>
                </Td>
                <Td>
                  <IconButton 
                    colorScheme={"red"}
                    variant={"outline"}
                    icon={<BsTrash />}
                    aria-label="deletar"
                    onClick={() => {
                      onOpen();
                      setProdutoDelete(produto);
                    }}
                  />
                </Td>
              </Tr>
            ))
          }
          
        </Tbody>
      </Table>
    </TableContainer>
    </Fragment>
  );
}