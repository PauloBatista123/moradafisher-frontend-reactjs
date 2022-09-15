import { Badge, Flex, IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Fragment, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { SkeletonLista } from "./SkeletonLista";
import { useFuncionarios } from "../../hooks/useFuncionarios";

export function Lista(){

  const {isLoading, funcionarios, getFuncionarios} = useFuncionarios();

  useEffect(() => {
    getFuncionarios();
  }, [])

  if(isLoading){
    return (
      <SkeletonLista />  
    )
  }

  return (
    <Fragment>
      <TableContainer>
      <Table variant='simple'>
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
            funcionarios?.map((funcionario) => (
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
                    <Text>
                      Última alteração {format(new Date(funcionario.updated_at), "d 'de' MMM 'às' hh:mm", { locale: ptBR} )}
                    </Text>
                    <Text color={"gray.500"} fontSize={"sm"}>
                      Criando em {format(new Date(funcionario.created_at), "d 'de' MMM 'de' yyyy", { locale: ptBR} )}
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
                      // onOpen();
                      // setProdutoDelete(funcionario);
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