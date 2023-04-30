import { memo } from "react";
import { Flex, Heading, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface NavBarProps {
   label: string;
   icon: IconType;
}

function NavTitle(props: NavBarProps) {
   return (
      <Flex align={"center"} gap={2}>
         <Icon as={props.icon} w={8} h={8} />
         <Heading fontWeight={500} fontSize={"xl"}>
            {props.label}
         </Heading>
      </Flex>
   );
}

export default memo(NavTitle);
