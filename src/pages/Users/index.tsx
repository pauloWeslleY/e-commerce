import { Box, Flex } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { NavTitle } from "../../components/NavBar";
import { UsersTable } from "./components/UsersTable";
import { SideBar } from "../../components/SideBar";

export function Users() {
   return (
      <SideBar>
         <Box px={4} py={4}>
            <Flex h={16}>
               <NavTitle label={"Usuários"} icon={AiOutlineUser} />
            </Flex>
         </Box>

         <UsersTable />
      </SideBar>
   );
}
