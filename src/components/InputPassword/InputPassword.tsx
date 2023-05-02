import { memo, useState } from "react";
import {
   Button,
   FormControl,
   Input,
   InputProps,
   InputGroup,
   InputRightElement,
   InputLeftElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { HiLockClosed } from "react-icons/hi";
import { FormLabelTitle } from "../FormLabelTitle";

function InputPassword({ ...props }: InputProps) {
   const [showPassword, setShowPassword] = useState<boolean>(false);

   return (
      <FormControl id="password" isRequired>
         <FormLabelTitle title="Senha" htmlFor="password" />
         <InputGroup>
            <InputLeftElement
               pointerEvents="none"
               children={<HiLockClosed color="gray.300" />}
            />
            <Input
               {...props}
               id="password"
               name="password"
               autoComplete="password"
               type={showPassword ? "text" : "password"}
               placeholder="Digite sua senha..."
               focusBorderColor={"purple.300"}
               fontFamily={"Poppins"}
               _placeholder={{ opacity: 1, color: "whiteAlpha.500" }}
            />
            <InputRightElement h={"full"}>
               <Button
                  variant={"ghost"}
                  onClick={() =>
                     setShowPassword((showPassword) => !showPassword)
                  }
               >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
               </Button>
            </InputRightElement>
         </InputGroup>
      </FormControl>
   );
}

export default memo(InputPassword);
