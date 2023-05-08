import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { SideBar } from "../../components/SideBar";

export function NotFound() {
   const [redirect, setRedirect] = useState<number>(3);
   const timeout = useRef<any>(0);
   const navigate = useNavigate();

   useEffect(() => {
      clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
         setRedirect((time: number) => time - 1);
      }, 1000);

      if (redirect <= 0) {
         navigate("/");
      }
   }, [redirect]);

   return (
      <SideBar>
         <Flex minH={"100vh"} align={"center"} justify={"center"}>
            <Box textAlign={"center"} py={10} px={6}>
               <Heading
                  display={"inline-block"}
                  as={"h2"}
                  size={"4xl"}
                  bgGradient={"linear(to-r, purple.400, purple.600)"}
                  backgroundClip={"text"}
               >
                  404
               </Heading>
               <Text fontSize={"2xl"} mt={3} mb={2}>
                  Page Not Found
               </Text>
               <Text color={"gray.100"} mb={6}>
                  Redirecionando para Home: {redirect}
               </Text>
            </Box>
         </Flex>
      </SideBar>
   );
}
