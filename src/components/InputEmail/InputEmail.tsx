import { memo } from "react";
import {
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   InputLeftElement,
   InputProps,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";

function InputEmail({ ...props }: InputProps) {
   return (
      <FormControl id="email" isRequired>
         <FormLabel>E-mail</FormLabel>
         <InputGroup>
            <InputLeftElement
               pointerEvents="none"
               children={<MdEmail color="gray.300" />}
            />
            <Input
               {...props}
               type="email"
               placeholder="Digite seu email..."
               maxW={"xl"}
               w={"lg"}
            />
         </InputGroup>
      </FormControl>
   );
}

export default memo(InputEmail);
