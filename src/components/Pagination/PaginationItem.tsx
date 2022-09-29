import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export function PaginationItem({ isCurrent = false, number, onPageChange }: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize={"xs"}
        width="4"
        colorScheme={"blue"}
        bg="blue.400"
        _disabled={{
          bgColor: 'blue.400',
          cursor: 'default'
        }}>
        {number}
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      fontSize={"xs"}
      width="4"
      bg="gray.100"
      _hover={{
        bgColor: 'gray.500',
      }}
      onClick={() => onPageChange(number)}
      >
      {number}
    </Button>
  )
}