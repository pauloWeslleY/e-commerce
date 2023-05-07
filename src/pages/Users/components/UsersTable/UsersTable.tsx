import { memo, useEffect, useState } from "react";
import { ButtonGroup, Td, useToast } from "@chakra-ui/react";
import {
   collection,
   deleteDoc,
   doc,
   getDocs,
   query,
   where,
} from "firebase/firestore";
import { UserType } from "../../../../types/UsersType";
import { db, auth } from "../../../../services/firebase";
import {
   WrapperTable,
   WrapperTableCell,
   WrapperTableRow,
   WrapperTableTdHero,
} from "../WrapperTable";
import { ModalHeroDelete } from "../../../../components/Modais";
import { ModalUserHero } from "./index";

const UsersTable = () => {
   const [users, setUsers] = useState<UserType[]>([]);
   const usersCollectionRef = collection(db, "users");
   const toast = useToast();
   const currentUser = auth.currentUser;

   const handleDeleteUser = async (id: string) => {
      await deleteDoc(doc(db, "users", id));
      const deleteUniqueUser = users.filter((user) => user.id !== id);
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
            where("email", "!=", true)
         );
         const querySnapshot = await getDocs(filteredUsers);
         const usersData = querySnapshot.docs.map<UserType>((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));

         setUsers(usersData);

         console.log(
            "name ==>",
            usersData.map((item) => item.username)
         );
      };

      filteredListUsers();
   }, []);

   return (
      <WrapperTable>
         {users.map((props, index) => {
            return (
               <WrapperTableRow key={index}>
                  <WrapperTableCell>ID:</WrapperTableCell>
                  <WrapperTableTdHero>{props.id}</WrapperTableTdHero>
                  <WrapperTableCell>Nome</WrapperTableCell>
                  <WrapperTableTdHero>{props.username}</WrapperTableTdHero>
                  <WrapperTableCell>Email</WrapperTableCell>
                  <WrapperTableTdHero>{props.email}</WrapperTableTdHero>
                  <WrapperTableCell>Ações</WrapperTableCell>
                  <Td>
                     <ButtonGroup variant="solid" size="sm" spacing={3}>
                        <ModalUserHero user={props} />

                        <ModalHeroDelete
                           user={props}
                           onHandleDelete={() => {
                              handleDeleteUser(props.id);
                              toast({
                                 title: `Item com ID ${props.id} deletado`,
                                 status: "success",
                                 duration: 10000,
                                 isClosable: true,
                              });
                           }}
                        />
                     </ButtonGroup>
                  </Td>
               </WrapperTableRow>
            );
         })}
      </WrapperTable>
   );
};

export default memo(UsersTable);
