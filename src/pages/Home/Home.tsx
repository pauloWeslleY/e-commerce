import { FormEvent, useEffect, useState } from "react";
import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   getDocs,
} from "firebase/firestore";
import { db } from "../../services/firebase";

type DataProps = {
   id?: string | any;
   name?: string;
   email?: string;
};

export function Home() {
   const [name, setName] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [users, setUsers] = useState<DataProps[]>([]);

   const usersCollectionRef = collection(db, "users");

   async function createDataUser() {
      try {
         const user = await addDoc(collection(db, "users"), {
            name,
            email,
         });

         console.log("dados salvos com sucessos", user);
      } catch (e) {
         console.error("Error adding document: ", e);
      }
   }

   const createUser = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newUser: DataProps = { name, email };
      const docRef = await addDoc(collection(db, "users"), newUser);
      setUsers([...users, { id: docRef.id, ...newUser }]);
      setName("");
      setEmail("");
   };

   useEffect(() => {
      async function getUsers() {
         const dataUser = await getDocs(usersCollectionRef);
         setUsers(
            dataUser.docs.map<DataProps>((doc) => ({
               ...doc.data(),
               id: doc.id,
            }))
         );
      }
      getUsers();
   }, []);

   const handleDelete = async (id: string) => {
      await deleteDoc(doc(db, "items", id));
      setUsers(users.filter((user) => user.id !== id));
   };

   return (
      <div>
         <form onSubmit={createUser}>
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
                  <button onClick={() => handleDelete(user.id)}>Deletar</button>
               </div>
            ))}
         </ul>
      </div>
   );
}
