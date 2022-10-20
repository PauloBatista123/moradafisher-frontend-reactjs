import { IconButton } from "@chakra-ui/react";
import { RiFilterOffLine } from "react-icons/ri";

interface IconButtonFilterProps {
  existsFilter: string[];
  limparFiltro: () => void;
}

export function IconButtonFilter({existsFilter, limparFiltro}: IconButtonFilterProps){
  console.log(existsFilter);
  if(existsFilter[0] !== undefined || existsFilter[1] !== undefined || existsFilter[2] !== undefined) {
    return (
      <IconButton aria-label='Limpar' onClick={() => limparFiltro()} as="a" size={"lg"} fontSize="sm" colorScheme={"gray"} cursor={"pointer"} mr={"2"} icon={<RiFilterOffLine />}></IconButton>
    )
  }else{
    return(
      <></>
    );
  }
}