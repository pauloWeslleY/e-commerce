import { memo } from "react";
import {
   FormControl,
   Input,
   InputGroup,
   InputLeftElement,
   InputProps,
} from "@chakra-ui/react";
import { RiUser3Fill } from "react-icons/ri";
import { FormLabelTitle } from "../FormLabelTitle";

function InputUserName({ ...props }: InputProps) {
   return (
      <FormControl id="username" isRequired>
         <FormLabelTitle title="Nome" htmlFor="name" />
         <InputGroup>
            <InputLeftElement
               pointerEvents="none"
               children={<RiUser3Fill color="gray.300" />}
            />
            <Input
               {...props}
               type="name"
               id="name"
               name="name"
               autoComplete="name"
               placeholder="Digite seu nome..."
               focusBorderColor={"purple.300"}
               _placeholder={{ opacity: 1, color: "whiteAlpha.500" }}
            />
         </InputGroup>
      </FormControl>
   );
}

export default memo(InputUserName);
