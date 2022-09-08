import { Text } from "@chakra-ui/react";

export function Logo(){
  return(
    <Text
      fontSize={["2xl"]}
      fontWeight={"bold"}
      letterSpacing="tight"
      w={"64"}
    >
      morada
      <Text as={"span"} color="blue.600">fisher</Text>
    </Text>
  )
}