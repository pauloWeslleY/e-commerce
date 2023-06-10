import { memo } from "react";
import { Box, BoxProps, CloseButton, Flex, Text } from "@chakra-ui/react";
import { useColors } from "../../../../hooks/useColors";
import { DashboardNavigation } from "../DashboardNavigation";

interface DashboardHeroContentProps extends BoxProps {
   onClose: () => void;
   title?: string;
}

const DashboardHeroContent = (props: DashboardHeroContentProps) => {
   const { title, onClose, ...rest } = props;
   const { THEME } = useColors();

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
         <Flex h={"20"} mx={"8"} align={"center"} justify={"space-between"}>
            <Text fontSize={"2xl"} fontFamily={"Inter"} fontWeight={600}>
               {title}
            </Text>

            <CloseButton
               display={{ base: "flex", md: "none" }}
               onClick={onClose}
            />
         </Flex>
         <DashboardNavigation />
      </Box>
   );
};

export default memo(DashboardHeroContent);
