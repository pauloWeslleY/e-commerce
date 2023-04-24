import { useState, useEffect, FormEvent } from "react";
import {
   collection,
   addDoc,
   getDocs,
   doc,
   updateDoc,
   deleteDoc,
} from "firebase/firestore";
import { db } from "../../../../services/firebase";
import {
   Box,
   FormControl,
   FormLabel,
   GridItem,
   Input,
   SimpleGrid,
   Stack,
   useDisclosure,
   chakra,
} from "@chakra-ui/react";
import { ModalCreateProduct } from "../ModalCreateProduct";
import { IsButton } from "../../../../components/Buttons";

type ProductProps = {
   id?: string;
   title?: string;
   description?: string;
   price?: number;
   category?: string;
   quantity?: number;
};

export function AddProduct() {
   const [items, setItems] = useState<ProductProps[]>([]);
   const [title, setTitle] = useState<string>("");
   const [price, setPrice] = useState<string | any>("");
   const [description, setDescription] = useState<string>("");
   const [category, setCategory] = useState<string>("");
   const [quantity, setQuantity] = useState<number>();
   const prodCollectionRef = collection(db, "items");
   const { onClose } = useDisclosure();

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
      setPrice(0);
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
      setPrice(0);
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
      <>
         <Box mt={[10, 0]} mb={8}>
            <chakra.form
               onSubmit={handleAddItem}
               shadow="base"
               rounded={[null, "md"]}
               overflow={{
                  sm: "hidden",
               }}
            >
               <Stack
                  px={4}
                  py={5}
                  p={[null, 6]}
                  bg="white"
                  _dark={{
                     bg: "#141517",
                  }}
                  spacing={6}
               >
                  <SimpleGrid columns={6} spacing={6}>
                     <FormControl as={GridItem} colSpan={[6, 3]}>
                        <FormLabel
                           htmlFor="first_name"
                           fontSize="sm"
                           fontWeight="md"
                           color="gray.700"
                           _dark={{
                              color: "gray.50",
                           }}
                        >
                           Nome do Produto
                        </FormLabel>
                        <Input
                           type="text"
                           name="first_name"
                           id="first_name"
                           autoComplete="given-name"
                           mt={1}
                           focusBorderColor="brand.400"
                           shadow="sm"
                           size="sm"
                           w="full"
                           rounded="md"
                           placeholder="Digite o nome do produto"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                        />
                     </FormControl>

                     <FormControl as={GridItem} colSpan={[6, 3]}>
                        <FormLabel
                           htmlFor="last_name"
                           fontSize="sm"
                           fontWeight="md"
                           color="gray.700"
                           _dark={{
                              color: "gray.50",
                           }}
                        >
                           Preço do Produto
                        </FormLabel>
                        <Input
                           type="number"
                           name="last_name"
                           id="last_name"
                           autoComplete="family-name"
                           mt={1}
                           focusBorderColor="brand.400"
                           shadow="sm"
                           size="sm"
                           w="full"
                           rounded="md"
                           placeholder="Digite o preço do produto"
                           value={price}
                           onChange={(e) => setPrice(e.target.value)}
                        />
                     </FormControl>

                     <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                        <FormLabel
                           htmlFor="street_address"
                           fontSize="sm"
                           fontWeight="md"
                           color="gray.700"
                           _dark={{
                              color: "gray.50",
                           }}
                        >
                           Descrição do Produto
                        </FormLabel>
                        <Input
                           type="text"
                           name="street_address"
                           id="street_address"
                           autoComplete="street-address"
                           mt={1}
                           focusBorderColor="brand.400"
                           shadow="sm"
                           size="sm"
                           w="full"
                           rounded="md"
                           placeholder="Digite a descrição do produto"
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                        />
                     </FormControl>

                     <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                        <FormLabel
                           htmlFor="state"
                           fontSize="sm"
                           fontWeight="md"
                           color="gray.700"
                           _dark={{
                              color: "gray.50",
                           }}
                        >
                           Quantidade do Produto
                        </FormLabel>
                        <Input
                           type="text"
                           name="state"
                           id="state"
                           autoComplete="state"
                           mt={1}
                           focusBorderColor="brand.400"
                           shadow="sm"
                           size="sm"
                           w="full"
                           rounded="md"
                           placeholder="Digite a quantidade do produto"
                           value={quantity}
                           onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                     </FormControl>

                     <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                        <FormLabel
                           htmlFor="postal_code"
                           fontSize="sm"
                           fontWeight="md"
                           color="gray.700"
                           _dark={{
                              color: "gray.50",
                           }}
                        >
                           Categoria do Produto
                        </FormLabel>
                        <Input
                           type="text"
                           name="postal_code"
                           id="postal_code"
                           autoComplete="postal-code"
                           mt={1}
                           focusBorderColor="brand.400"
                           shadow="sm"
                           size="sm"
                           w="full"
                           rounded="md"
                           placeholder="Digite a categoria do produto"
                           value={category}
                           onChange={(e) => setCategory(e.target.value)}
                        />
                     </FormControl>
                  </SimpleGrid>
               </Stack>
               <Box
                  px={{
                     base: 4,
                     sm: 6,
                  }}
                  py={3}
                  bg="gray.50"
                  _dark={{
                     bg: "#121212",
                  }}
                  textAlign="right"
               >
                  <IsButton
                     title={"Adicionar"}
                     type="submit"
                     onClick={onClose}
                  />
               </Box>
            </chakra.form>
         </Box>

         {items.map((item) => (
            <div key={item.id}>
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
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
               />
               <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
               />
               <button onClick={() => handleUpdateItem(item.id)}>Update</button>
               <button onClick={() => handleDelete(item.id)}>Delete</button>

               <div>{item.title}</div>
               <div>{item.description}</div>
               <div>{item.price}</div>
               <div>{item.category}</div>
               <div>{item.quantity}</div>
            </div>
         ))}
      </>
   );
}
