import { Badge, Flex, IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { format } from "date-fns";
import { SkeletonLista } from "./SkeletonLista";
import { useFuncionarios } from "../../hooks/useFuncionarios";
import { Funcionario } from "../../utils/interfaces";
import { AlertDialogDelete } from "./AlertDialogDelete";
import { Pagination } from "../../components/Pagination/Index";

export function Lista(){

  const [funcionarioDelete, setFuncionarioDelete] = useState<Funcionario>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const {data, isLoading, error, refetch} = useFuncionarios(page);

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