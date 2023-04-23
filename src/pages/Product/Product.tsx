import { useState, useEffect, FormEvent } from "react";
import {
   collection,
   addDoc,
   getDocs,
   doc,
   updateDoc,
   deleteDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";

type Item = {
   id?: string;
   title?: string;
   description?: string;
   price?: number;
   category?: string;
};

export function Product() {
   const [items, setItems] = useState<Item[]>([]);
   const [title, setTitle] = useState<string>("");
   const [price, setPrice] = useState<number | any>(0);
   const [description, setDescription] = useState<string>("");
   const [category, setCategory] = useState<string>("");

   useEffect(() => {
      const getItems = async () => {
         const data = await getDocs(collection(db, "items"));
         const items = data.docs.map<Item>((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setItems(items);
      };
      getItems();
   }, []);

   const handleAddItem = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newItem: Item = { title, description, price, category };
      const docRef = await addDoc(collection(db, "items"), newItem);
      setItems([...items, { id: docRef.id, ...newItem }]);
      setTitle("");
      setDescription("");
      setPrice(0);
      setCategory("");
   };

   const handleUpdateItem = async (id: string | any) => {
      const item = items.find((item) => item.id === id);
      const updatedItem: Item = { title, description, category, price };
      await updateDoc(doc(db, "items", id), updatedItem);
      setItems(
         items.map((item) => (item.id === id ? { id, ...updatedItem } : item))
      );
      setTitle("");
      setDescription("");
   };

   const handleDelete = async (id: string | any) => {
      await deleteDoc(doc(db, "items", id));
      setItems(items.filter((item) => item.id !== id));
   };

   return (
      <div>
         <form onSubmit={handleAddItem}>
            <input
               type="text"
               placeholder="Title"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
            />
            <input
               type="text"
               placeholder="Description"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
            />
            <input
               type="number"
               placeholder="Price"
               value={price}
               onChange={(e) => setPrice(e.target.value)}
            />
            <input
               type="text"
               placeholder="Category"
               value={category}
               onChange={(e) => setCategory(e.target.value)}
            />
            <button type="submit">Add item</button>
         </form>
         {items.map((item) => (
            <div key={item.id}>
               <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
               />
               <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
               />
               <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
               />
               <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
               />
               <button onClick={() => handleUpdateItem(item.id)}>Update</button>
               <button onClick={() => handleDelete(item.id)}>Delete</button>

               <div>{item.title}</div>
               <div>{item.description}</div>
               <div>{item.price}</div>
               <div>{item.category}</div>
            </div>
         ))}
      </div>
   );
}
