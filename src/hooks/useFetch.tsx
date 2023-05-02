import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { ProductsType } from "../types/ProductType";
import { CategoryType } from "../types/CategoryType";
import { UserType } from "../types/UsersType";

export function useFetch() {
   const [items, setItems] = useState<ProductsType[]>([]);
   const [categories, setCategories] = useState<CategoryType[]>([]);
   const [users, setUsers] = useState<UserType[]>([]);
   const usersCollectionRef = collection(db, "users");
   const itemsCollectionRef = collection(db, "items");
   const categoryCollectionRef = collection(db, "categories");

   useEffect(() => {
      const getUsers = async () => {
         const dataUser = await getDocs(usersCollectionRef);
         const users = dataUser.docs.map<UserType>((doc) => ({
            ...doc.data(),
            uid: doc.id,
         }));
         setUsers(users);
      };

      const getCategories = async () => {
         const data = await getDocs(categoryCollectionRef);
         const category = data.docs.map<CategoryType>((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setCategories(category);
      };

      const getItems = async () => {
         const data = await getDocs(itemsCollectionRef);
         const items = data.docs.map<ProductsType>((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setItems(items);
      };

      getCategories();
      getItems();
      getUsers();
   }, []);

   return {
      items,
      categories,
      users,
   };
}
