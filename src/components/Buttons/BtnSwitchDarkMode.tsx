import { memo } from "react";
import { Button, ButtonProps, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function BtnSwitchDarkMode({ ...rest }: ButtonProps) {
   const { colorMode, toggleColorMode } = useColorMode();

   return (
      <Button
         {...rest}
         size={"md"}
         variant={"ghost"}
         aria-label="open menu"
         onClick={toggleColorMode}
      >
         {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
   );
}

export default memo(BtnSwitchDarkMode);
