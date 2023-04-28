import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Heading } from "@chakra-ui/react";

export function PageNotFound404() {
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
      <>
         <Flex py={62} justify={"center"} fontWeight={600} fontSize={"lg"}>
            Redirecionando para Home: {redirect}
         </Flex>

         <Flex
            py={34}
            justify={"center"}
            align={"center"}
            gap={3}
            textTransform={"uppercase"}
            flexDir={"column"}
         >
            <Heading fontSize={"8xl"}>404</Heading>
            <Heading>Pagina Não Encontrada</Heading>
         </Flex>
      </>
   );
}
