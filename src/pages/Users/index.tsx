import { Box, Flex } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { NavTitle } from "../../components/NavBar";
// import { Dashboard } from "../Dashboard/Dashboard";
import { UsersTable } from "./components/UsersTable";
import { PageUsers } from "./Users";
import { SideBar } from "../../components/SideBar";

export function Users() {
   return (
      <SideBar>
         <Box px={4} py={4}>
            <Flex h={16}>
               <NavTitle label={"Usuários"} icon={AiOutlineUser} />
            </Flex>
         </Box>

         <PageUsers />

         <UsersTable />
      </SideBar>
   );
}
