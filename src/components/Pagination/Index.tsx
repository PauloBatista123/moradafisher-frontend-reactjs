import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountofRegisters ?: number;
  registerPerPage ?: number;
  currentPage ?: number;
  numberToPage ?: number;
  lastPage ?: number;
  numberOfItens ?: number;
  onPageChange?: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number){
  return [...new Array(to - from)].map((_, index) => {
    return from + index + 1;
  }).filter(page => page > 0);
}

export function Pagination({ 
  totalCountofRegisters = 1, registerPerPage = 15, currentPage = 1, onPageChange, numberToPage = 1, lastPage = 1, numberOfItens = 1
  }: PaginationProps){
    
  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : [];

  const nextPages = currentPage < lastPage
  ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
  : [];

  const numberOfRegister = numberToPage > registerPerPage ? numberToPage - registerPerPage : numberToPage;

  return(
    <Stack
      direction={["column","row"]}
      mt="8"
      justify={"space-between"}
      align="center"
      spacing={"6"}
    >
      <Box>
        <strong>{currentPage > 1 && currentPage < lastPage ? (
          numberOfRegister + 1 ) : currentPage === lastPage ? (
          totalCountofRegisters - numberOfItens
          ) : 1}</strong> - <strong> {numberToPage}</strong> de <strong>{totalCountofRegisters}</strong>
      </Box>
      <Stack direction={"row"} spacing="2">
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > (2 + siblingsCount) && <Text color={"gray.300"} width={"6"} textAlign="center" alignSelf={"flex-end"}>...</Text>}
          </>
          
        )}

        {previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />;
        })}

        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent={true}/>

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />;
        })}

        {(currentPage + siblingsCount)< lastPage && (
          <>
          {(currentPage + siblingsCount + 1) < lastPage && <Text color={"gray.300"} width={"6"} textAlign="center" alignSelf={"flex-end"}>...</Text>}
          <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
          
        )}

      </Stack>
    </Stack>
  );
}