import { memo } from "react";
import { Input, InputProps } from "@chakra-ui/react";

function InputBar({ ...rest }: InputProps) {
   return (
      <Input
         {...rest}
         mt={1}
         focusBorderColor={"gray.700"}
         _placeholder={{ opacity: 1, color: "gray.400" }}
         fontFamily={"Poppins"}
         shadow={"sm"}
         size={"sm"}
         w={"full"}
         rounded={"md"}
      />
   );
}

export default memo(InputBar);
