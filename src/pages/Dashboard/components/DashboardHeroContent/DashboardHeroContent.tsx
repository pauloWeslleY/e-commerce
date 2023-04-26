import { memo } from "react";
import { IconType } from "react-icons";
import { Box, BoxProps, CloseButton, Flex, Text } from "@chakra-ui/react";
import { FiStar, FiSettings } from "react-icons/fi";
import { DashboardNavItems } from "../DashboardNavItems";
import { useColors } from "../../../../hooks/useColors";
import { useNavigate } from "react-router-dom";
import { BiHomeAlt2, BiUser } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

interface LinkItemProps {
   name: string;
   icon: IconType;
   path: string;
}

interface DashboardHeroContentProps extends BoxProps {
   onClose: () => void;
}

const DashboardHeroContent = (props: DashboardHeroContentProps) => {
   const { onClose, ...rest } = props;
   const { THEME } = useColors();
   const navigate = useNavigate();

   const LinkItems: Array<LinkItemProps> = [
      { name: "Home", icon: BiHomeAlt2, path: "/" },
      {
         name: "Produtos",
         icon: MdOutlineProductionQuantityLimits,
         path: "/dashboard/product",
      },
      { name: "Usuário", icon: BiUser, path: "" },
      { name: "Favorites", icon: FiStar, path: "" },
      { name: "Settings", icon: FiSettings, path: "" },
   ];

   return (
      <Box
         transition={"3s ease"}
         bg={THEME.DASHBOARD.SIDE_BAR_BG}
         borderRight={"1px"}
         borderRightColor={THEME.DASHBOARD.BORDER_RIGHT_COLORS}
         pos={"fixed"}
         w={{ base: "full", md: 60 }}
         h={"full"}
         {...rest}
      >
         <Flex
            h={"20"}
            alignItems={"center"}
            mx={"8"}
            justify={"space-between"}
         >
            <Text fontSize={"2xl"} fontFamily={"Inter"} fontWeight={600}>
               Dashboard
            </Text>
            <CloseButton
               display={{ base: "flex", md: "none" }}
               onClick={onClose}
            />
         </Flex>
         {LinkItems.map((link) => (
            <DashboardNavItems
               key={link.name}
               icon={link.icon}
               onClickNav={() => navigate(link.path)}
            >
               {link.name}
            </DashboardNavItems>
         ))}
      </Box>
   );
};

export default memo(DashboardHeroContent);
