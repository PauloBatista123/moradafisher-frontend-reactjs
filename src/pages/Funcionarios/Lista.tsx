import { Badge, Flex, IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { format } from "date-fns";
import { SkeletonLista } from "./SkeletonLista";
import { useFuncionarios } from "../../hooks/useFuncionarios";
import { Funcionario } from "../../utils/interfaces";
import { AlertDialogDelete } from "./AlertDialogDelete";
import { Pagination } from "../../components/Pagination/Index";
import { useFormContext } from "react-hook-form";
import { queryClient } from "../../services/queryCliente";

export function Lista(){

  const {watch} = useFormContext();
  const [funcionarioDelete, setFuncionarioDelete] = useState<Funcionario>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string[]>([]);
  const filtrar = watch(["filtra_nome", "filtra_ordem"]);
  const {data, isLoading, error, refetch} = useFuncionarios({page, filter});

  useEffect(()=>{

    if(filtrar[0] != undefined || filtrar[1] != undefined){
      setFilter(filtrar);
    }   

    return () => {
      queryClient.invalidateQueries(["funcionarios"]);
    }
  }, [filtrar[0], filtrar[1]])

  return (
    <Fragment>
      {funcionarioDelete && (
          <AlertDialogDelete 
          isOpen={isOpen}
          mensagem={"Deseja deletar o funcionário?"}
          onClose={onClose}
          titulo={"Deletar Funcionário"}
          funcionario={funcionarioDelete}
          key={"deletar-funcionario"}
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
              <Th>Funcionário</Th>
              <Th>Status</Th>
              <Th>Alteração</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
          
            {
              data?.data.map((funcionario) => (
                <Tr 
                _hover={{
                  bgColor: "blackAlpha.50"
                }}
                key={funcionario.id}
                >
                  <Td>
                    <Flex direction={"column"}>
                      <Text fontWeight={"bold"} fontSize={"lg"}>
                        {funcionario.nome}
                      </Text>
                      <Text>
                        Cargo: {funcionario.cargo}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                      <Badge colorScheme={funcionario.status === 'BLOQUEADO' ? 'red' : 'green'} fontWeight={"bold"} fontSize={"sm"} padding={"8px"} borderRadius={"6px"}>
                        {funcionario.status}
                      </Badge>
                  </Td>
                  <Td>
                    <Flex direction={"column"}>
                      <Text color={"gray.500"} fontSize={"sm"}>
                        {funcionario.updated_at}
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
                        setFuncionarioDelete(funcionario);
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