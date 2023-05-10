import { ReactNode, memo } from "react";
import { ButtonGroup, Td, Tr } from "@chakra-ui/react";
import { UserType } from "../../../../types/UsersType";
import { WrapperTableCell, WrapperTableTdHero } from "./index";
import { ModalUserHero } from "../ModalUserHero";

interface WrapperTableRowProps {
   users: UserType;
   children: ReactNode;
}

function WrapperTableRow({ children, users }: WrapperTableRowProps) {
   return (
      <Tr
         display={{ base: "grid", md: "table-row" }}
         sx={{
            "@media print": { display: "table-row" },
            gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
            gridGap: "10px",
         }}
      >
         <WrapperTableCell>ID:</WrapperTableCell>
         <WrapperTableTdHero>{users.id}</WrapperTableTdHero>
         <WrapperTableCell>Nome</WrapperTableCell>
         <WrapperTableTdHero>{users.username}</WrapperTableTdHero>
         <WrapperTableCell>Email</WrapperTableCell>
         <WrapperTableTdHero>{users.email}</WrapperTableTdHero>
         <WrapperTableCell>Ações</WrapperTableCell>
         <Td>
            <ButtonGroup size={"sm"} spacing={3}>
               <ModalUserHero user={users} />

               {children}
            </ButtonGroup>
         </Td>
      </Tr>
   );
}

export default memo(WrapperTableRow);
