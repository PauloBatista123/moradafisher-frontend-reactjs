import { Box, Button, Divider, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import { BsTrashFill } from 'react-icons/bs';
import ptBR from 'date-fns/locale/pt-BR'
import { useLancamentos } from '../../hooks/useLancamentos';
import { useEffect } from 'react';

export function ListaLancamentos(){
  
  const { getLancamentos, create, lancamentos} = useLancamentos();

  useEffect(() => {
    getLancamentos();
  }, []);

  return (
    <SimpleGrid minChildWidth={"320px"} columns={3}>
      {
        lancamentos.length > 0 ?
          lancamentos.map(lancamento => (
            <Box
              border={'2px'}
              borderColor={"gray.100"}
              margin={"3"}
              display={"flex"}
              flexDirection={"column"}
              padding={"3"}
              borderRadius={"8"}
              shadow={"lg"}
              bgColor={"gray.50"}
            >
              <Text color={"gray.400"} fontSize="small" lineHeight={"1"}>
                Funcionário:
              </Text>
              <Text 
                  textTransform={"capitalize"}
                  color={"gray.500"}
                  fontWeight={"bold"}
                  fontSize={"2xl"}
                >{lancamento.funcionario.nome}</Text>
              <Divider marginTop={"2"} marginBottom={"2"} color={"gray.50"} />
              <Flex
                direction={"row"}
                justifyContent={"space-between"}
                marginBottom={"2"}
              >

                <Text 
                  textTransform={"uppercase"}
                  color={lancamento.type === 'entrada' ? 'blue.400' : 'red.400'}
                  fontWeight={"bold"}
                  fontSize={"sm"}
                >{lancamento.type}</Text>
                <Text 
                  textTransform={"lowercase"}
                  color={"gray.400"}
                  fontSize={"sm"}
                >{formatDistanceToNow(new Date(lancamento.dataLancamento), {
                  locale: ptBR,
                  addSuffix: true
                }) }</Text>
              </Flex>
              
              <Text
                fontSize={"3xl"}
              >
                {Number(lancamento.peso).toLocaleString(undefined)} kg de {lancamento.type === 'saida' ? 'Filé' : 'Tilápia'}
              </Text>
              <Divider marginTop={"2"} marginBottom={"2"} color={"gray.50"} />
              <Box display={"flex"} flexDirection={"row"} justifyContent={"end"}>
                <Button
                  variant={"outline"}
                  color={"red.800"}
                  borderColor={"red.800"}
                  size={"sm"}
                  leftIcon={<BsTrashFill/>}
                  _hover={{
                    bgColor: 'red.800',
                    color: 'white'
                  }}
                >
                    Excluir
                </Button>
              </Box>
              
            </Box>
          ))
          : (
            <Text>
              Não possui...
            </Text>
          )
      }
    </SimpleGrid>
  )
}