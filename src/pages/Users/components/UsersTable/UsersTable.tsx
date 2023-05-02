import { memo, useEffect, useState } from "react";
import { ButtonGroup, IconButton, Td, Tr } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { UserType } from "../../../../types/UsersType";
import { db } from "../../../../services/firebase";
import {
   WrapperTable,
   WrapperTableCell,
   WrapperTableTdHero,
} from "../WrapperTable";

const UsersTable = () => {
   const [users, setUsers] = useState<UserType[]>([]);
   const usersCollectionRef = collection(db, "users");

   useEffect(() => {
      const filteredListUsers = async () => {
         const filteredUsers = query(
            usersCollectionRef,
            where("displayName", "!=", true)
         );
         const querySnapshot = await getDocs(filteredUsers);
         const usersData = querySnapshot.docs.map<UserType>((doc) => ({
            uid: doc.id,
            ...doc.data(),
         }));

         setUsers(usersData);

         console.log(
            "name ==>",
            usersData.map((item) => item.displayName)
         );
      };

      filteredListUsers();
   }, []);

   return (
      <WrapperTable>
         {users.map((token, index) => {
            return (
               <Tr
                  key={index}
                  display={{
                     base: "grid",
                     md: "table-row",
                  }}
                  sx={{
                     "@media print": {
                        display: "table-row",
                     },
                     gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                     gridGap: "10px",
                  }}
               >
                  <WrapperTableCell>ID:</WrapperTableCell>
                  <WrapperTableTdHero>{token.uid}</WrapperTableTdHero>
                  <WrapperTableCell>Nome</WrapperTableCell>
                  <WrapperTableTdHero>{token.displayName}</WrapperTableTdHero>
                  <WrapperTableCell>Email</WrapperTableCell>
                  <WrapperTableTdHero>{token.email}</WrapperTableTdHero>
                  <WrapperTableCell>Ações</WrapperTableCell>
                  <Td>
                     <ButtonGroup variant="solid" size="sm" spacing={3}>
                        <IconButton
                           colorScheme="blue"
                           icon={<BsBoxArrowUpRight />}
                           aria-label="Up"
                        />
                        <IconButton
                           colorScheme="green"
                           icon={<AiFillEdit />}
                           aria-label="Edit"
                        />
                        <IconButton
                           colorScheme="red"
                           variant="outline"
                           icon={<BsFillTrashFill />}
                           aria-label="Delete"
                        />
                     </ButtonGroup>
                  </Td>
               </Tr>
            );
         })}
      </WrapperTable>
   );
};

export default memo(UsersTable);
