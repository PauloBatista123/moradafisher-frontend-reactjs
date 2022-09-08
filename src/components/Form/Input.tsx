import { FormControl, FormErrorMessage, FormLabel, Input as InputForm, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError, Merge } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  type: string;
  error?: Merge<FieldError, undefined>;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>  = ({name, label, type, error, ...rest}, ref) => {
  return(
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel htmlFor={name} >{label}</FormLabel> }

      <InputForm
        type={type}
        name={name}
        id={name}
        focusBorderColor="blue.500"
        bgColor="gray.100"
        variant="filled"
        _hover={{
          bgColor: 'gray.100'
        }}
        _focus={{
          bgColor: 'gray.100'
        }}
        size="lg"
        ref={ref}
        {...rest}
      />

      { !!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
      

    </FormControl>
  );
}

export const Input = forwardRef(InputBase);