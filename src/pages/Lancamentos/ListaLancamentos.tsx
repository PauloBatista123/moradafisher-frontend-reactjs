import { Badge, Button, Flex, IconButton, Skeleton, SkeletonText, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { format, formatDistanceToNow } from 'date-fns';
import { BsTrash, BsTrashFill } from 'react-icons/bs';
import ptBR from 'date-fns/locale/pt-BR'
import { useLancamentos } from '../../hooks/useLancamentos';
import { Fragment, useEffect, useState } from 'react';
import { Lancamento } from "../../utils/interfaces";
import { AlertDialogDelete } from "./AlertDialogDelete";
import { SkeletonLista } from "./SkeletonLista";
import { Pagination } from "../../components/Pagination/Index";
import { useFormContext } from "react-hook-form";
import { queryClient } from "../../services/queryCliente";

export function ListaLancamentos(){
  
  const {watch} = useFormContext();
  const [lancamentoDelete, setLancamentoDelte] = useState<Lancamento>();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string[]>([]);
  const {data, isLoading, error} = useLancamentos({page, filter});
  const filtrar = watch(["filtra_funcionario", "filtra_produto", "filtra_tipo"]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(()=>{

    setFilter(filtrar);

    return () => {
      queryClient.invalidateQueries(["lancamentos"]);
    }
  }, [filtrar[0], filtrar[1], filtrar[2]])

  return (
    <Fragment>
      {lancamentoDelete && (
          <AlertDialogDelete 
          isOpen={isOpen}
          mensagem={"Deseja deletar o lancamento?"}
          onClose={onClose}
          titulo={"Deletar Lancamento"}
          lancamento={lancamentoDelete}
          key={"deletar-lancamento"}
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
      <Table variant='simple' size={'sm'}>
        <Thead>
          <Tr>
            <Th>##</Th>
            <Th>Produto</Th>
            <Th>Funcionário</Th>
            <Th>Tipo</Th>
            <Th>Informação</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
        
          {
            data?.data.map((lancamento) => (
              <Tr 
              _hover={{
                bgColor: "blackAlpha.50"
              }}
              key={lancamento.id}
              >
                <Td>
                  <Text fontWeight={"bold"} fontSize={"lg"}>
                      {lancamento.id}
                  </Text>
                </Td>
                <Td>
                  <Flex direction={"column"}>
                    <Text fontWeight={"bold"} fontSize={"lg"}>
                      {lancamento.produto.nome}
                    </Text>
                    <Text>
                      Medida: {`${lancamento.peso} ${lancamento.produto.unidade}`}
                    </Text>
                  </Flex>
                </Td>
                <Td>
                  <Text>
                    {lancamento.funcionario.nome}
                  </Text>
                </Td>
                <Td>
                    <Badge colorScheme={lancamento.tipo === 'SAIDA' ? 'red' : 'green'} fontWeight={"bold"} fontSize={"sm"} padding={"8px"} borderRadius={"6px"}>
                      {lancamento.tipo}
                    </Badge>
                </Td>
                <Td>
                  <Flex direction={"column"}>
                    <Text>
                      Criado em {lancamento.created_at}
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
                      setLancamentoDelte(lancamento);
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
  )
}