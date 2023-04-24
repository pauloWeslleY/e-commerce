import { memo, useState } from "react";
import {
   Button,
   FormControl,
   FormLabel,
   Input,
   InputProps,
   InputGroup,
   InputRightElement,
   InputLeftElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { HiLockClosed } from "react-icons/hi";

function InputPassword({ ...props }: InputProps) {
   const [showPassword, setShowPassword] = useState<boolean>(false);

   return (
      <FormControl id="password" isRequired>
         <FormLabel>Senha</FormLabel>
         <InputGroup>
            <InputLeftElement
               pointerEvents="none"
               children={<HiLockClosed color="gray.300" />}
            />
            <Input
               {...props}
               id="password"
               type={showPassword ? "text" : "password"}
               placeholder="Digite sua senha..."
               focusBorderColor={"blue.400"}
               _placeholder={{ opacity: 1, color: "gray.400" }}
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
