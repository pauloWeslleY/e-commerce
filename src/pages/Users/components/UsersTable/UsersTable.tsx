import { memo, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
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
import { ModalHeroDelete } from "../../../../components/Modais";
import { WrapperTable, WrapperTableRow } from "../WrapperTable";

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
      };

      filteredListUsers();
   }, []);

   return (
      <WrapperTable>
         {users.map((props, index) => (
            <WrapperTableRow key={index} users={props}>
               <ModalHeroDelete
                  title="Usuário"
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
            </WrapperTableRow>
         ))}
      </WrapperTable>
   );
};

export default memo(UsersTable);
