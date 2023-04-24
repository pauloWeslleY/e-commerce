import { memo } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

interface IsButtonProps extends ButtonProps {
   title: string;
}

function IsButton(props: IsButtonProps) {
   const { title, ...rest } = props;

   return (
      <Button
         {...rest}
         px={8}
         bg={"whiteAlpha.200"}
         color={"whiteAlpha.900"}
         rounded={"md"}
         border={"2px"}
         borderColor={"blue.500"}
         _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
         }}
      >
         {title}
      </Button>
   );
}

export default memo(IsButton);
