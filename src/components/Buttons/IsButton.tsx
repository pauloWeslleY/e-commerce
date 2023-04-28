import { memo } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useColors } from "../../hooks/useColors";

interface IsButtonProps extends ButtonProps {
   title: string;
}

function IsButton(props: IsButtonProps) {
   const { title, ...rest } = props;
   const { THEME } = useColors();

   return (
      <Button
         {...rest}
         px={8}
         bg={THEME.BUTTONS.IS_BUTTON_BACKGROUND}
         color={THEME.BUTTONS.IS_BUTTON_COLORS}
         rounded={"md"}
         border={"2px"}
         borderColor={THEME.BUTTONS.IS_BUTTON_BORDER_COLORS}
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
