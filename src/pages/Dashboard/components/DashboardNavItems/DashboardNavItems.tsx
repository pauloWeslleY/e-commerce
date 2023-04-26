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
            transition={"all .2s ease"}
            _hover={{
               bg: "purple.300",
               color: "whiteAlpha.900",
               transform: "translateY(-5%)",
            }}
            {...rest}
         >
            {icon && (
               <Icon
                  mr={"4"}
                  fontSize={20}
                  _groupHover={{
                     color: "whiteAlpha.900",
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
