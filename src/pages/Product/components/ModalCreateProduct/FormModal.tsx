import { memo, useState, useEffect, FormEvent } from "react";
import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import {
   collection,
   addDoc,
   getDocs,
   doc,
   updateDoc,
   deleteDoc,
} from "firebase/firestore";
import { db } from "../../../../services/firebase";
import { IsButton } from "../../../../components/Buttons";

type ProductProps = {
   id?: string;
   title?: string;
   description?: string;
   price?: number;
   category?: string;
   quantity?: number;
};

function FormModal({ onClose }: { onClose: () => void }) {
   const [items, setItems] = useState<ProductProps[]>([]);
   const [title, setTitle] = useState<string>("");
   const [price, setPrice] = useState<string | any>("");
   const [description, setDescription] = useState<string>("");
   const [category, setCategory] = useState<string>("");
   const [quantity, setQuantity] = useState<number>();
   const prodCollectionRef = collection(db, "items");

   const handleAddItem = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newItem: ProductProps = {
         title,
         description,
         price,
         category,
         quantity,
      };
      const docRef = await addDoc(prodCollectionRef, newItem);
      setItems([...items, { id: docRef.id, ...newItem }]);
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setQuantity(0);
   };

   const handleUpdateItem = async (id: string | any) => {
      const updatedItem: ProductProps = {
         title,
         description,
         category,
         price,
         quantity,
      };
      const products = items.map((item) =>
         item.id === id ? { id, ...updatedItem } : item
      );
      await updateDoc(doc(db, "items", id), updatedItem);
      setItems(products);
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setQuantity(0);
   };

   const handleDelete = async (id: string | any) => {
      await deleteDoc(doc(db, "items", id));
      setItems(items.filter((item) => item.id !== id));
   };

   useEffect(() => {
      const getItems = async () => {
         const data = await getDocs(prodCollectionRef);
         const items = data.docs.map<ProductProps>((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setItems(items);
      };
      getItems();
   }, []);

   return (
      <form onSubmit={handleAddItem}>
         <FormControl>
            <FormLabel>Nome do Produto</FormLabel>
            <Input
               type="text"
               placeholder="Digite o nome do produto"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
            />
         </FormControl>
         <FormControl mt={4}>
            <FormLabel>Descrição do Produto</FormLabel>
            <Input
               type="text"
               placeholder="Digite a descrição do produto"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
            />
         </FormControl>
         <FormControl mt={4}>
            <FormLabel>Preço do Produto</FormLabel>
            <Input
               type="number"
               placeholder="Digite o preço do produto"
               value={price}
               onChange={(e) => setPrice(e.target.value)}
            />
         </FormControl>
         <FormControl mt={4}>
            <FormLabel>Quantidade do Produto</FormLabel>
            <Input
               type="text"
               placeholder="Digite a quantidade do produto"
               value={quantity}
               onChange={(e) => setQuantity(Number(e.target.value))}
            />
         </FormControl>
         <FormControl mt={4}>
            <FormLabel>Categoria do Produto</FormLabel>
            <Input
               type="text"
               placeholder="Digite a categoria do produto"
               value={category}
               onChange={(e) => setCategory(e.target.value)}
            />
         </FormControl>

         <Stack mt={4}>
            <IsButton title={"Adicionar"} type="submit" onClick={onClose} />
         </Stack>
      </form>
   );
}

export default memo(FormModal);
