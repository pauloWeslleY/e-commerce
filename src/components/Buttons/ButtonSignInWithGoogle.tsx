import { memo } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { AiOutlineGoogle } from "react-icons/ai";

interface ButtonSignInWithGoogle extends ButtonProps {
   title: string;
}

const ButtonSignInWithGoogle = (BtnProps: ButtonSignInWithGoogle) => {
   const { title, ...props } = BtnProps;
   return (
      <Button
         {...props}
         leftIcon={<AiOutlineGoogle />}
         bg={"red.500"}
         size={"lg"}
         color={"whiteAlpha.900"}
         variant={"solid"}
         transition={"all .2s ease-out 200ms"}
         _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
         }}
      >
         {title}
      </Button>
   );
};

export default memo(ButtonSignInWithGoogle);
