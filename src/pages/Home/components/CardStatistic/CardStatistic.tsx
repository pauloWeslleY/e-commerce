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
         w={"full"}
         height={{ base: "10rem", md: "12rem" }}
         direction={{ base: "column", md: "column" }}
         boxShadow={"lg"}
         justifyContent={"center"}
         bg={background}
         color={THEME.TEXT_COLORS}
      >
         <Stack flexDirection={"column"} justifyContent={"center"}>
            <Flex justify={"space-around"} align={"center"}>
               <Heading fontSize={"2xl"} fontFamily={"Inter"}>
                  {title}
               </Heading>
               <Icon as={icon} boxSize={9} />
            </Flex>
         </Stack>
         <Stack flexDirection={"column"}>
            <Flex justify={"space-evenly"}>
               <Text
                  as={"span"}
                  fontSize={"4xl"}
                  fontFamily={"Inter"}
                  fontWeight={500}
                  textAlign={"center"}
                  color={THEME.SPAN_COLORS}
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
