import { Badge, Button, Flex, IconButton, Skeleton, SkeletonText, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BsTrash } from "react-icons/bs";
import { Pagination } from "../../components/Pagination/Index";
import { useProdutos } from "../../hooks/useProdutos";
import { queryClient } from "../../services/queryCliente";
import { Produtos } from "../../utils/interfaces";
import { AlertDialogDelete } from "./AlertDialogDelete";
import { SkeletonLista } from "./SkeletonLista";

export function Lista() {

  const {watch} = useFormContext();
  const [produtoDelete, setProdutoDelete] = useState<Produtos | undefined>(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string[]>([]);
  const filtrar = watch(["filtra_nome", "filtra_ordem"]);
  const {data, isLoading, error} = useProdutos({page, filter});

  useEffect(()=>{

    if(filtrar[0] != undefined || filtrar[1] != undefined){
      setFilter(filtrar);
    }   

    return () => {
      queryClient.invalidateQueries(["produtos"]);
    }
  }, [filtrar[0], filtrar[1]])

  return (

    <Fragment>
      {produtoDelete && (
      <AlertDialogDelete 
        isOpen={isOpen}
        mensagem={"Deseja deletar o produto?"}
        onClose={onClose}
        titulo={"Deletar Produto"}
        produto={produtoDelete}
        key={"deletar-produto"}
      />
      )}
      
      {isLoading ? (
        <SkeletonLista />
      ) : error ? (
        <Flex justify={"center"}>
          <Text>Falha ao obter dados</Text>
        </Flex>
      ) : (

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
    )}
    </Fragment>
  );
}