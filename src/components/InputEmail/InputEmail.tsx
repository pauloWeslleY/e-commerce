import { memo } from "react";
import {
   FormControl,
   Input,
   InputGroup,
   InputLeftElement,
   InputProps,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { FormLabelTitle } from "../FormLabelTitle";

function InputEmail({ ...props }: InputProps) {
   return (
      <FormControl id="email" isRequired>
         <FormLabelTitle title="Email" htmlFor="email" />
         <InputGroup>
            <InputLeftElement
               pointerEvents="none"
               children={<MdEmail color="gray.300" />}
            />
            <Input
               {...props}
               type="email"
               id="email"
               name="email"
               autoComplete="email"
               placeholder="Digite seu email..."
               focusBorderColor={"purple.300"}
               _placeholder={{ opacity: 1, color: "whiteAlpha.500" }}
               maxW={"xl"}
               w={"lg"}
            />
         </InputGroup>
      </FormControl>
   );
}

export default memo(InputEmail);
