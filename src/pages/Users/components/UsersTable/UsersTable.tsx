import { memo, useEffect, useState } from "react";
import {
   Button,
   ButtonGroup,
   IconButton,
   Popover,
   PopoverArrow,
   PopoverBody,
   PopoverCloseButton,
   PopoverContent,
   PopoverFooter,
   PopoverHeader,
   PopoverTrigger,
   Portal,
   Td,
   Tr,
   useToast,
} from "@chakra-ui/react";
import {
   collection,
   deleteDoc,
   doc,
   getDocs,
   query,
   where,
} from "firebase/firestore";
import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { UserType } from "../../../../types/UsersType";
import { db, auth } from "../../../../services/firebase";
import {
   WrapperTable,
   WrapperTableCell,
   WrapperTableTdHero,
} from "../WrapperTable";

const UsersTable = () => {
   const [users, setUsers] = useState<UserType[]>([]);
   const usersCollectionRef = collection(db, "users");
   const toast = useToast();
   const currentUser = auth.currentUser;

   const handleDeleteUser = async (id: string) => {
      await deleteDoc(doc(db, "users", id));
      const deleteUniqueUser = users.filter((user) => user.uid !== id);
      setUsers(deleteUniqueUser);

      if (!currentUser) {
         currentUser.delete().then(() => {
            toast({
               title: "Usuário Excluído!",
               status: "success",
               duration: 9000,
               isClosable: true,
            });
         });
      }
   };

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
                        <Popover placement="left">
                           <PopoverTrigger>
                              <IconButton
                                 colorScheme="red"
                                 variant="outline"
                                 icon={<BsFillTrashFill />}
                                 aria-label="Delete"
                              />
                           </PopoverTrigger>
                           <Portal>
                              <PopoverContent>
                                 <PopoverArrow />
                                 <PopoverHeader>Header</PopoverHeader>
                                 <PopoverCloseButton />
                                 <PopoverBody>{token.uid}</PopoverBody>
                                 <PopoverFooter>
                                    <Button
                                       variant="outline"
                                       colorScheme="red"
                                       onClick={() =>
                                          handleDeleteUser(token.uid)
                                       }
                                    >
                                       Deletar
                                    </Button>
                                 </PopoverFooter>
                              </PopoverContent>
                           </Portal>
                        </Popover>
                     </ButtonGroup>
                  </Td>
               </Tr>
            );
         })}
      </WrapperTable>
   );
};

export default memo(UsersTable);
