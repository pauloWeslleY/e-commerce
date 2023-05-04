import { FormEvent, useEffect, useState } from "react";
import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   getDocs,
} from "firebase/firestore";
import {
   // Flex,
   // ListItem,
   // Text,
   // UnorderedList,
   chakra,
   useToast,
} from "@chakra-ui/react";
import { auth, db } from "../../services/firebase";
import { InputBar } from "../../components/InputBar";
import { IsButton } from "../../components/Buttons";
import { UserType } from "../../types/UsersType";

export function PageUsers() {
   const [displayName, setDisplayName] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [users, setUsers] = useState<UserType[]>([]);
   const usersCollectionRef = collection(db, "users");
   const toast = useToast();
   const currentUser = auth.currentUser;

   const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newUser: UserType = { displayName, email };
      const docRef = await addDoc(usersCollectionRef, newUser);
      setUsers([...users, { uid: docRef.id, ...newUser }]);
      setDisplayName("");
      setEmail("");
   };

   const handleDeleteUser = async (id: string) => {
      await deleteDoc(doc(db, "users", id));
      const deleteUniqueUser = users.filter((user) => user.uid !== id);
      setUsers(deleteUniqueUser);

      if (currentUser) {
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
      async function getUsers() {
         const dataUser = await getDocs(usersCollectionRef);
         const users = dataUser.docs.map<UserType>((doc) => ({
            uid: doc.id,
            ...doc.data(),
         }));
         setUsers(users);
      }
      getUsers();
   }, []);

   return (
      <>
         {/* <chakra.form onSubmit={handleCreateUser} my={4}>
            <InputBar
               type="text"
               placeholder="Nome"
               value={displayName}
               onChange={(e) => setDisplayName(e.target.value)}
            />
            <InputBar
               type="email"
               placeholder="E-mail"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <IsButton title="Criar User" type="submit" />
         </chakra.form> */}

         {/* <UnorderedList
            bg={"blackAlpha.600"}
            boxShadow={"xl"}
            rounded={"md"}
            listStyleType={"none"}
            spacing={6}
            p={5}
         >
            {users.map((user) => (
               <Flex
                  key={user.uid}
                  flexDir={"row"}
                  justify={"space-between"}
                  align={"center"}
                  boxShadow={"xl"}
                  rounded={"sm"}
                  bg={"purple.500"}
                  p={3}
               >
                  <ListItem>
                     <Text>{user.displayName}</Text>
                     <Text>{user.email}</Text>
                  </ListItem>
                  <IsButton
                     title="Deletar"
                     onClick={() => handleDeleteUser(user.uid)}
                  />
               </Flex>
            ))}
         </UnorderedList> */}
      </>
   );
}
