import { memo } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface ButtonSignProps extends ButtonProps {
   title: string;
}

const ButtonSign = ({ title, ...props }: ButtonSignProps) => (
   <Button
      {...props}
      rightIcon={<ArrowForwardIcon />}
      size={"lg"}
      rounded={"md"}
      bg={"purple.700"}
      color={"whiteAlpha.900"}
      transition={"all .2s ease-out 200ms"}
      _hover={{
         transform: "translateY(-2px)",
         boxShadow: "lg",
      }}
   >
      {title}
   </Button>
);

export default memo(ButtonSign);
