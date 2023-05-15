import { memo } from "react";
import {
   chakra,
   Box,
   Flex,
   useColorModeValue,
   Text,
   Stack,
   SimpleGrid,
} from "@chakra-ui/react";
import IconFeature from "./IconFeature";
import { IsButton } from "../../../../components/Buttons";

const HeroPricing = () => {
   const topBg = useColorModeValue("gray.100", "purple.100");
   const bottomBg = useColorModeValue("white", "blackAlpha.400");

   return (
      <Box
         as={"section"}
         w={"full"}
         rounded={"md"}
         textAlign={{ base: "left", md: "center" }}
      >
         <Flex
            rounded={"md"}
            bg={bottomBg}
            textAlign={"left"}
            flexDir={{ base: "column", lg: "row" }}
         >
            <Stack spacing={8} p={"45px"} flex={"0.7"}>
               <Text fontSize={"3xl"} fontWeight={"bold"} lineHeight={"tight"}>
                  Lifetime Membership
               </Text>
               <chakra.p
                  fontSize={["sm", "md"]}
                  color={"gray.600"}
                  _dark={{ color: "gray.50" }}
               >
                  One plan for any organization—from startups to Fortune 500s.
                  We offer 50% off of for all students and universities. Please
                  get in touch with us and provide proof of your status.
               </chakra.p>
               <Flex align={"center"}>
                  <Text
                     fontFamily={"body"}
                     whiteSpace={"nowrap"}
                     fontWeight={500}
                     textTransform={"uppercase"}
                     color={"brand.400"}
                  >
                     What's included
                  </Text>
                  <Flex
                     h={"3px"}
                     w={"full"}
                     ml={"15px"}
                     borderTopWidth={"1px"}
                     borderTopColor={topBg}
                  />
               </Flex>
               <SimpleGrid columns={[1, 2, 1, 2]} spacingY={4}>
                  <IconFeature>Unlimited Projects</IconFeature>
                  <IconFeature>Email Tracking and Analytics </IconFeature>
                  <IconFeature>
                     Email APIs, SMTP Relay, and Webhooks
                  </IconFeature>
                  <IconFeature>
                     1 Dedicated IP (Foundation 100k and up)
                  </IconFeature>
               </SimpleGrid>
            </Stack>
            <Stack
               p={"45px"}
               flex={"0.3"}
               justify={"center"}
               align={"center"}
               bg="#F9FAFB"
               _dark={{ bg: "gray.800" }}
               borderRightRadius={"md"}
            >
               <Text fontSize={"xl"} fontWeight={"semibold"}>
                  Pay once, use anytime
               </Text>
               <Flex
                  align={"center"}
                  fontSize={"5xl"}
                  fontWeight={["bold", "extrabold"]}
                  lineHeight={"tight"}
               >
                  $500
                  <chakra.span
                     ml={2}
                     fontSize={"2xl"}
                     fontWeight={"medium"}
                     color={"gray.500"}
                     _dark={{ color: "gray.400" }}
                  >
                     {" "}
                     USD
                  </chakra.span>
               </Flex>
               <Stack spacing={6}>
                  <Text
                     textDecor={"underline"}
                     color={"gray.600"}
                     _dark={{ color: "gray.400" }}
                  >
                     Learn more about our membership
                  </Text>
                  <IsButton title="Get Access" />
                  <Text align={"center"} fontWeight={"semibold"}>
                     Get a free sample
                     <chakra.span
                        ml={2}
                        color={"gray.500"}
                        _dark={{ color: "gray.400" }}
                        fontWeight={"medium"}
                     >
                        (50MB)
                     </chakra.span>
                  </Text>
               </Stack>
            </Stack>
         </Flex>
      </Box>
   );
};

export default memo(HeroPricing);
