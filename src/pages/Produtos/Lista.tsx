import { Badge, Button, Flex, IconButton, Skeleton, SkeletonText, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Fragment, useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { Pagination } from "../../components/Pagination/Index";
import { useProdutos } from "../../hooks/useProdutos";
import { Produtos } from "../../utils/interfaces";
import { AlertDialogDelete } from "./AlertDialogDelete";
import { SkeletonLista } from "./SkeletonLista";

export function Lista() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [produtoDelete, setProdutoDelete] = useState<Produtos | undefined>(undefined);
  const [page, setPage] = useState(1);
  const {data} = useProdutos(page);

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
      <Table variant='simple' size={"sm"}>
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
            data?.data.map((produto) => (
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
                    <Text color={"gray.500"} fontSize={"sm"}>
                      {produto.created_at}
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
      <Pagination 
          totalCountofRegisters={data?.meta.total}
          currentPage={data?.meta.current_page}
          onPageChange={setPage}
          numberToPage={data?.meta.to}
          lastPage={data?.meta.last_page}
          numberOfItens={data?.data.length}
          registerPerPage={data?.meta.per_page}
        />
    </TableContainer>
    </Fragment>
  );
}