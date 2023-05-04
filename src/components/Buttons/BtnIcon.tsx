import { ReactElement, memo } from "react";
import { IconButton, IconButtonProps } from "@chakra-ui/react";

interface BtnIconProps extends IconButtonProps {
   icon: ReactElement;
}

function BtnIcon(props: BtnIconProps) {
   const { icon, ...rest } = props;

   return <IconButton {...rest} size={"sm"} rounded={"lg"} icon={icon} />;
}

export default memo(BtnIcon);
