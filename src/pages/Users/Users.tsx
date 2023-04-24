import { FormEvent, useEffect, useState } from "react";
import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   getDocs,
} from "firebase/firestore";
import { db } from "../../services/firebase";

type UserProps = {
   id?: string | any;
   name?: string;
   email?: string;
};

export function Users() {
   const [name, setName] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [users, setUsers] = useState<UserProps[]>([]);

   const usersCollectionRef = collection(db, "users");

   const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newUser: UserProps = { name, email };
      const docRef = await addDoc(usersCollectionRef, newUser);
      setUsers([...users, { id: docRef.id, ...newUser }]);
      setName("");
      setEmail("");
   };

   const handleDeleteUser = async (id: string) => {
      await deleteDoc(doc(db, "users", id));
      setUsers(users.filter((user) => user.id !== id));
   };

   useEffect(() => {
      async function getUsers() {
         const dataUser = await getDocs(usersCollectionRef);
         const users = dataUser.docs.map<UserProps>((doc) => ({
            ...doc.data(),
            id: doc.id,
         }));
         setUsers(users);
      }
      getUsers();
   }, []);

   return (
      <div>
         <form onSubmit={handleCreateUser}>
            <input
               type="text"
               placeholder="Nome"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <input
               type="email"
               placeholder="E-mail"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Criar User</button>
         </form>

         <ul>
            {users.map((user) => (
               <div key={user.id}>
                  <li>{user.name}</li>
                  <li>{user.email}</li>
                  <button onClick={() => handleDeleteUser(user.id)}>
                     Deletar
                  </button>
               </div>
            ))}
         </ul>
      </div>
   );
}
