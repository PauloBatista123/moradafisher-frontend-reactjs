import { Badge, Button, Flex, IconButton, Skeleton, SkeletonText, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { format, formatDistanceToNow } from 'date-fns';
import { BsTrash, BsTrashFill } from 'react-icons/bs';
import ptBR from 'date-fns/locale/pt-BR'
import { useLancamentos } from '../../hooks/useLancamentos';
import { useEffect } from 'react';

export function ListaLancamentos(){
  
  const { lancamentos} = useLancamentos();

  return (
    <TableContainer>
      <Table variant='simple' size={'sm'}>
        <Thead>
          <Tr>
            <Th>Produto</Th>
            <Th>Funcionário</Th>
            <Th>Tipo</Th>
            <Th>Informação</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
        
          {
            lancamentos.map((lancamento) => (
              <Tr 
              _hover={{
                bgColor: "blackAlpha.50"
              }}
              key={lancamento.id}
              >
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
                      Criado em {format(new Date(lancamento.created_at), "d 'de' MMM 'às' hh:mm", { locale: ptBR} )}
                    </Text>
                  </Flex>
                </Td>
                <Td>
                  <IconButton 
                    colorScheme={"red"}
                    variant={"outline"}
                    icon={<BsTrash />}
                    aria-label="deletar"
                  />
                </Td>
              </Tr>
            ))
          }
          
        </Tbody>
      </Table>
      </TableContainer>
  )
}