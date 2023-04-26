import { memo } from "react";
import { Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { useColors } from "../../../../hooks/useColors";

interface CardsTypeProps {
   title: string;
   subtitle: any;
   icon: IconType;
   background: string;
}

function CardStatistic(props: CardsTypeProps) {
   const { title, subtitle, icon, background } = props;
   const { THEME } = useColors();

   return (
      <Stack
         borderWidth={"1px"}
         borderRadius={"lg"}
         w={{ sm: "100%", md: "540px" }}
         height={{ sm: "476px", md: "15rem" }}
         direction={{ base: "column", md: "column" }}
         bg={background}
         boxShadow={"xl"}
         justifyContent={"center"}
      >
         <Stack flexDirection={"column"} justifyContent={"center"}>
            <Flex justify={"space-around"} align={"center"}>
               <Heading fontSize={"2xl"} fontFamily={"Inter"}>
                  {title}
               </Heading>
               <Icon as={icon} boxSize={7} />
            </Flex>
         </Stack>
         <Stack flexDirection={"column"}>
            <Flex justify={"space-around"}>
               <Text
                  textAlign={"center"}
                  color={THEME.HOME.CARDS_STATISTIC_TEXT_COLORS}
                  px={3}
               >
                  {subtitle}
               </Text>
            </Flex>
         </Stack>
      </Stack>
   );
}

export default memo(CardStatistic);
