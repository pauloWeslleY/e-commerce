import { memo } from "react";
import { Box, Flex, FlexProps, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
   icon: IconType;
   children: String;
   onClickNav: () => void;
}

const DashboardNavItems = (props: NavItemProps) => {
   const { icon, children, onClickNav, ...rest } = props;

   return (
      <Box _focus={{ boxShadow: "none" }}>
         <Flex
            align={"center"}
            p={"4"}
            mx={"4"}
            borderRadius={"lg"}
            role={"group"}
            cursor={"pointer"}
            onClick={onClickNav}
            _hover={{
               bg: "cyan.400",
               color: "whiteAlpha.900",
            }}
            {...rest}
         >
            {icon && (
               <Icon
                  mr="4"
                  fontSize="16"
                  _groupHover={{
                     color: "white",
                  }}
                  as={icon}
               />
            )}
            {children}
         </Flex>
      </Box>
   );
};

export default memo(DashboardNavItems);
