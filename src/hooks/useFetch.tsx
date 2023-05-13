import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { ProductsType } from "../types/ProductType";
import { CategoryType } from "../types/CategoryType";
import { UserType } from "../types/UsersType";

export function useFetch() {
   const [product, setProduct] = useState<ProductsType[]>([]);
   const [categories, setCategories] = useState<CategoryType[]>([]);
   const [isCategories, setIsCategories] = useState<CategoryType[]>([]);
   const [users, setUsers] = useState<UserType[]>([]);
   const usersCollectionRef = collection(db, "users");
   const productCollectionRef = collection(db, "product");
   const categoryCollectionRef = collection(db, "categories");

   useEffect(() => {
      const getUsers = async () => {
         const dataUser = await getDocs(usersCollectionRef);
         const users = dataUser.docs.map<UserType>((doc) => ({
            ...doc.data(),
            id: doc.id,
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

      const getProduct = async () => {
         const data = await getDocs(productCollectionRef);
         const items = data.docs.map<ProductsType>((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setProduct(items);
      };

      const filteredCategory = async () => {
         const filteredCategories = query(
            categoryCollectionRef,
            where("name", "!=", true),
            orderBy("name", "asc")
         );
         const querySnapshot = await getDocs(filteredCategories);
         const isCategory = querySnapshot.docs.map<any>((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));

         setIsCategories(isCategory);
      };

      getCategories();
      getProduct();
      getUsers();
      filteredCategory();
   }, []);

   return {
      product,
      categories,
      users,
      isCategories,
   };
}
