import { useState, useEffect, FormEvent } from "react";
import {
   collection,
   addDoc,
   getDocs,
   doc,
   updateDoc,
   deleteDoc,
} from "firebase/firestore";
import {
   Box,
   FormControl,
   GridItem,
   SimpleGrid,
   Stack,
   Flex,
   chakra,
   useDisclosure,
   Tr,
   Td,
   IconButton,
   Collapse,
   useToast,
   Button,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IsButton } from "../../../../components/Buttons";
import { db } from "../../../../services/firebase";
import { useColors } from "../../../../hooks/useColors";
import { FormLabelTitle } from "../FormLabelTitle";
import { InputBar } from "../InputBar";
import { TableProduct } from "../TableProduct";
import { ProductsType } from "../../../../types/ProductType";
import { NavBar } from "../../../../components/NavBar/NavBar";
import { ModalAlertProduct } from "../ModalUpdateProduct";

export function AddProduct() {
   const [items, setItems] = useState<ProductsType[]>([]);
   const [title, setTitle] = useState<string>("");
   const [price, setPrice] = useState<string | any>("");
   const [description, setDescription] = useState<string>("");
   const [category, setCategory] = useState<string>("");
   const [quantity, setQuantity] = useState<number | any>();
   const { THEME } = useColors();
   const { onToggle, onClose } = useDisclosure();
   const updateProduct = useDisclosure();
   const alert = useDisclosure();
   const navBarToggle = useDisclosure();
   const prodCollectionRef = collection(db, "items");
   const toast = useToast();

   const handleAddItem = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newItem: ProductsType = {
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
      setQuantity("");
      toast({
         title: "Produto Cadastrado!",
         status: "success",
         duration: 9000,
         isClosable: true,
      });
   };

   const handleUpdateItem = async (id: string | any) => {
      const updatedItem: ProductsType = {
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
      setQuantity("");
   };

   const handleUpdateProduct = () => {
      const updateId = items.find((props) => props.id);
      handleUpdateItem(updateId.id);
      console.log(updateId);
      onToggle();
      toast({
         title: "Produto Atualizado!",
         status: "success",
         duration: 9000,
         isClosable: true,
      });
   };

   const handleDelete = async (id: string | any) => {
      await deleteDoc(doc(db, "items", id));
      setItems(items.filter((item) => item.id !== id));
   };

   const deleteItem = () => {
      const deleteId = items.find((props) => props.id);
      handleDelete(deleteId.id);
      onClose();
      toast({
         title: "Produto Deletado!",
         status: "success",
         duration: 9000,
         isClosable: true,
      });
   };

   useEffect(() => {
      const getItems = async () => {
         const data = await getDocs(prodCollectionRef);
         const items = data.docs.map<ProductsType>((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setItems(items);
      };
      getItems();
   }, []);

   return (
      <>
         <NavBar onOpen={navBarToggle.onToggle} />

         <Collapse in={navBarToggle.isOpen} animateOpacity>
            <Box mt={[10, 0]} mb={8}>
               <chakra.form
                  onSubmit={handleAddItem}
                  shadow={"base"}
                  rounded={[null, "md"]}
                  overflow={{
                     sm: "hidden",
                  }}
               >
                  <Stack
                     px={4}
                     py={5}
                     p={[null, 6]}
                     bg={THEME.DASHBOARD.FORM_BACKGROUND}
                     spacing={6}
                  >
                     <SimpleGrid columns={6} spacing={6}>
                        <FormControl as={GridItem} colSpan={[6, 3]}>
                           <FormLabelTitle
                              title="Nome do Produto"
                              htmlFor="name_product"
                           />

                           <InputBar
                              type="text"
                              name="name_product"
                              id="name_product"
                              autoComplete="name_product"
                              placeholder="Digite o nome do produto"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                           />
                        </FormControl>

                        <FormControl as={GridItem} colSpan={[6, 3]}>
                           <FormLabelTitle
                              title="Preço do Produto"
                              htmlFor="price_product"
                           />

                           <InputBar
                              type="number"
                              name="price_product"
                              id="price_product"
                              autoComplete="price_product"
                              placeholder="Digite o preço do produto"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                           />
                        </FormControl>

                        <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                           <FormLabelTitle
                              title="Descrição do Produto"
                              htmlFor="description_product"
                           />

                           <InputBar
                              type="text"
                              name="description_product"
                              id="description_product"
                              autoComplete="description_product"
                              placeholder="Digite a descrição do produto"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                           />
                        </FormControl>

                        <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                           <FormLabelTitle
                              title="Quantidade do Produto"
                              htmlFor="quantity_product"
                           />

                           <InputBar
                              type="text"
                              name="quantity_product"
                              id="quantity_product"
                              autoComplete="quantity_product"
                              placeholder="Digite a quantidade do produto"
                              value={quantity}
                              onChange={(e) =>
                                 setQuantity(Number(e.target.value))
                              }
                           />
                        </FormControl>

                        <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                           <FormLabelTitle
                              title="Categoria do Produto"
                              htmlFor="category_product"
                           />
                           <InputBar
                              type="text"
                              name="category_product"
                              id="category_product"
                              autoComplete="category_product"
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
                     bg={THEME.DASHBOARD.FORM_FOOTER_BACKGROUND}
                     textAlign={"right"}
                  >
                     <IsButton
                        title="Adicionar"
                        type="submit"
                        onClick={navBarToggle.onToggle}
                     />
                  </Box>
               </chakra.form>
            </Box>
         </Collapse>

         <TableProduct>
            {items.map((item) => (
               <Tr as={"tr"} key={item.id}>
                  <Td>{item.title}</Td>
                  <Td>{item.description}</Td>
                  <Td>{item.category}</Td>
                  <Td isNumeric>{item.quantity} uni</Td>
                  <Td isNumeric>R$ {item.price}</Td>
                  <Td>
                     <Flex gap={2}>
                        <IconButton
                           size={"sm"}
                           rounded={"lg"}
                           variant="outline"
                           colorScheme="blue"
                           aria-label="Update item"
                           onClick={updateProduct.onToggle}
                           icon={<EditIcon />}
                        />

                        <IconButton
                           size={"sm"}
                           rounded={"lg"}
                           variant="outline"
                           colorScheme="red"
                           aria-label="Delete item"
                           onClick={alert.onOpen}
                           icon={<DeleteIcon />}
                        />

                        <ModalAlertProduct
                           isOpen={alert.isOpen}
                           onClose={alert.onClose}
                        >
                           <Button onClick={alert.onClose}>Cancelar</Button>
                           <Button
                              colorScheme="red"
                              ml={3}
                              onClick={deleteItem}
                           >
                              Deletar
                           </Button>
                        </ModalAlertProduct>
                     </Flex>
                  </Td>
               </Tr>
            ))}
         </TableProduct>

         <Collapse in={updateProduct.isOpen} animateOpacity>
            <form>
               <Stack
                  bg={THEME.DASHBOARD.FORM_BACKGROUND}
                  spacing={6}
                  borderTopRadius={12}
                  px={4}
                  py={5}
                  p={[null, 6]}
               >
                  <SimpleGrid columns={6} spacing={6}>
                     <FormControl as={GridItem} colSpan={[6, 3]}>
                        <FormLabelTitle
                           title="Nome do Produto"
                           htmlFor="name_product"
                        />

                        <InputBar
                           type="text"
                           name="name_product"
                           id="name_product"
                           autoComplete="name_product"
                           placeholder="Digite o nome do produto"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                        />
                     </FormControl>

                     <FormControl as={GridItem} colSpan={[6, 3]}>
                        <FormLabelTitle
                           title="Preço do Produto"
                           htmlFor="price_product"
                        />

                        <InputBar
                           type="number"
                           name="price_product"
                           id="price_product"
                           autoComplete="price_product"
                           placeholder="Digite o preço do produto"
                           value={price}
                           onChange={(e) => setPrice(e.target.value)}
                        />
                     </FormControl>

                     <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                        <FormLabelTitle
                           title="Descrição do Produto"
                           htmlFor="description_product"
                        />

                        <InputBar
                           type="text"
                           name="description_product"
                           id="description_product"
                           autoComplete="description_product"
                           placeholder="Digite a descrição do produto"
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                        />
                     </FormControl>

                     <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                        <FormLabelTitle
                           title="Quantidade do Produto"
                           htmlFor="quantity_product"
                        />

                        <InputBar
                           type="text"
                           name="quantity_product"
                           id="quantity_product"
                           autoComplete="quantity_product"
                           placeholder="Digite a quantidade do produto"
                           value={quantity}
                           onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                     </FormControl>

                     <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                        <FormLabelTitle
                           title="Categoria do Produto"
                           htmlFor="category_product"
                        />
                        <InputBar
                           type="text"
                           name="category_product"
                           id="category_product"
                           autoComplete="category_product"
                           placeholder="Digite a categoria do produto"
                           value={category}
                           onChange={(e) => setCategory(e.target.value)}
                        />
                     </FormControl>
                  </SimpleGrid>
               </Stack>
               <Box
                  bg={THEME.DASHBOARD.FORM_FOOTER_BACKGROUND}
                  borderBottomRadius={12}
                  px={{
                     base: 4,
                     sm: 6,
                  }}
                  py={3}
                  textAlign={"right"}
               >
                  <IsButton title="Atualizar" onClick={handleUpdateProduct} />
               </Box>
            </form>
         </Collapse>
      </>
   );
}
