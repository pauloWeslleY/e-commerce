import { memo, useEffect, useState } from "react";
import {
   Button,
   ButtonGroup,
   Flex,
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
   Text,
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
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { BsFillEyeFill } from "react-icons/bs";
import { UserType } from "../../../../types/UsersType";
import { db, auth } from "../../../../services/firebase";
import {
   WrapperTable,
   WrapperTableCell,
   WrapperTableRow,
   WrapperTableTdHero,
} from "../WrapperTable";
import { BtnIcon } from "../../../../components/Buttons";

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
               <WrapperTableRow key={index}>
                  <WrapperTableCell>ID:</WrapperTableCell>
                  <WrapperTableTdHero>{token.uid}</WrapperTableTdHero>
                  <WrapperTableCell>Nome</WrapperTableCell>
                  <WrapperTableTdHero>{token.displayName}</WrapperTableTdHero>
                  <WrapperTableCell>Email</WrapperTableCell>
                  <WrapperTableTdHero>{token.email}</WrapperTableTdHero>
                  <WrapperTableCell>Ações</WrapperTableCell>
                  <Td>
                     <ButtonGroup variant="solid" size="sm" spacing={3}>
                        <BtnIcon
                           colorScheme="teal"
                           aria-label="Show item"
                           icon={<BsFillEyeFill />}
                        />
                        <BtnIcon
                           colorScheme="blue"
                           aria-label="Edit item"
                           icon={<EditIcon />}
                        />
                        <Popover placement="left">
                           <PopoverTrigger>
                              <BtnIcon
                                 variant="outline"
                                 colorScheme="red"
                                 aria-label="Delete"
                                 icon={<DeleteIcon />}
                              />
                           </PopoverTrigger>
                           <Portal>
                              <PopoverContent>
                                 <PopoverArrow />
                                 <PopoverHeader>
                                    Desejar Excluir este usuário?
                                 </PopoverHeader>
                                 <PopoverCloseButton />
                                 <PopoverBody>
                                    <Flex flexDir={"column"} gap={3}>
                                       <Text
                                          as={"h3"}
                                          fontSize={"md"}
                                          fontWeight={500}
                                       >
                                          {token.uid}
                                       </Text>
                                       <Text
                                          as={"span"}
                                          fontSize={"lg"}
                                          fontWeight={500}
                                       >
                                          {token.displayName}
                                       </Text>
                                    </Flex>
                                 </PopoverBody>
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
               </WrapperTableRow>
            );
         })}
      </WrapperTable>
   );
};

export default memo(UsersTable);
