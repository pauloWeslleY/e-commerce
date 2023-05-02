import { useState, useEffect, FormEvent } from "react";
import {
   collection,
   addDoc,
   getDocs,
   doc,
   updateDoc,
   deleteDoc,
   where,
   query,
} from "firebase/firestore";
import {
   Box,
   FormControl,
   GridItem,
   SimpleGrid,
   Stack,
   Flex,
   IconButton,
   Collapse,
   Button,
   ButtonGroup,
   Popover,
   PopoverTrigger,
   PopoverContent,
   PopoverHeader,
   PopoverBody,
   PopoverFooter,
   PopoverArrow,
   PopoverCloseButton,
   Portal,
   Text,
   chakra,
   useToast,
   useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { db } from "../../../../services/firebase";
import { useColors } from "../../../../hooks/useColors";
import { ProductsType } from "../../../../types/ProductType";
import { TableProductItem } from "../TableProduct";
import { FormLabelTitle } from "../../../../components/FormLabelTitle";
import { InputBar } from "../../../../components/InputBar";
import { IsButton } from "../../../../components/Buttons";
import { NavBar } from "../../../../components/NavBar";

export function AddProduct() {
   const [items, setItems] = useState<ProductsType[]>([
      {
         title: "",
         description: "",
         category: "",
         price: "",
         quantity: 0,
      },
   ]);
   const [title, setTitle] = useState<string>("");
   const [price, setPrice] = useState<string>("");
   const [description, setDescription] = useState<string>("");
   const [category, setCategory] = useState<string>("");
   const [quantity, setQuantity] = useState<number>();
   const { THEME } = useColors();
   const alert = useDisclosure();
   const navBarToggle = useDisclosure();
   const toast = useToast();
   const prodCollectionRef = collection(db, "items");

   const TABLE_HEADER = ["ID", "Nome", "Preço", "Quantidade", "Categorias"];
   const prodItems: ProductsType = {
      title,
      description,
      price,
      category,
      quantity,
   };

   const handleAddItem = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = query(collection(db, "items"), where("title", "==", title));
      const querySnapshot = await getDocs(data);

      try {
         if (querySnapshot.empty) {
            const docRef = await addDoc(prodCollectionRef, prodItems);
            setItems([...items, { id: docRef.id, ...prodItems }]);
            setTitle("");
            setPrice("");
            setDescription("");
            setCategory("");
            setQuantity(0);
            toast({
               title: "Produto Cadastrado!",
               status: "success",
               duration: 9000,
               isClosable: true,
            });
         } else {
            toast({
               title: "Produto já cadastrado!",
               status: "error",
               duration: 9000,
               isClosable: true,
            });
         }
      } catch (error) {
         toast({
            title: "Não foi possível cadastrar este produto!",
            status: "error",
            duration: 9000,
            isClosable: true,
         });
         console.log(error);
      }
   };

   const handleUpdateItem = async (id: string) => {
      const item = items.some((item) => item.id === id);
      try {
         if (item && title.length !== 0) {
            const products = items.map((item) =>
               item.id === id ? { id, ...prodItems } : item
            );
            await updateDoc(doc(db, "items", id), prodItems);
            setItems(products);
            setTitle("");
            setPrice("");
            setDescription("");
            setCategory("");
            setQuantity(0);
            toast({
               title: "Produto Atualizado!",
               status: "success",
               duration: 9000,
               isClosable: true,
            });
         } else {
            toast({
               title: "Produto já atualizado!",
               status: "error",
               duration: 9000,
               isClosable: true,
            });
         }
      } catch (error) {
         toast({
            title: "Falha ao atualizar o produto!",
            status: "error",
            duration: 9000,
            isClosable: true,
         });
         console.error(error);
      }
   };

   const handleDelete = async (id: string) => {
      await deleteDoc(doc(db, "items", id));
      setItems(items.filter((item) => item.id !== id));
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

      const isResultData = async () => {
         const filtered = query(
            prodCollectionRef,
            where("category", "==", "Electronics")
         );
         const querySnapshot = await getDocs(filtered);

         const itemsData = querySnapshot.docs.map<ProductsType>((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));

         console.log(itemsData.map((item) => item.title));
      };

      getItems();
      isResultData();
   }, []);

   return (
      <>
         <NavBar
            label="Tabela de Produtos"
            title="Criar Produto"
            onOpen={navBarToggle.onToggle}
            icon={MdOutlineStoreMallDirectory}
         />

         <Collapse in={navBarToggle.isOpen} animateOpacity>
            <Box mt={[10, 0]} mb={8}>
               <chakra.form
                  onSubmit={handleAddItem}
                  shadow={"md"}
                  rounded={[null, "md"]}
                  overflow={{ sm: "hidden" }}
               >
                  <Stack
                     px={4}
                     py={5}
                     p={[null, 6]}
                     bg={THEME.DASHBOARD.FORM_BACKGROUND}
                     spacing={6}
                  >
                     <SimpleGrid columns={6} spacing={6}>
                        <FormControl isRequired as={GridItem} colSpan={[6, 3]}>
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

                        <FormControl isRequired as={GridItem} colSpan={[6, 3]}>
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

                        <FormControl isRequired as={GridItem} colSpan={[6, 3]}>
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

                        <FormControl isRequired as={GridItem} colSpan={[6, 3]}>
                           <FormLabelTitle
                              title="Quantidade do Produto"
                              htmlFor="quantity_product"
                           />

                           <InputBar
                              type="number"
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

                        <FormControl isRequired as={GridItem} colSpan={[6, 3]}>
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

         <TableProductItem>
            {items.map((props, i) => (
               <Flex
                  key={`${props.id}${i}`}
                  flexDir={{ base: "row", md: "column" }}
                  bg={THEME.DASHBOARD.TABLE_PRODUCT_LINE_BG}
               >
                  <SimpleGrid
                     spacingY={3}
                     columns={{ base: 1, md: 6 }}
                     w={{ base: 230, md: "full" }}
                     textTransform={"uppercase"}
                     bg={THEME.DASHBOARD.TABLE_PRODUCT_ITEM_BG}
                     color={THEME.DASHBOARD.TABLE_PRODUCT_TITLE_COLORS}
                     py={{ base: 1, md: 4 }}
                     px={{ base: 2, md: 10 }}
                     fontSize={"md"}
                     fontWeight={600}
                     alignItems={"center"}
                  >
                     {TABLE_HEADER.map((item, i) => (
                        <span key={i}>{item}</span>
                     ))}
                     <chakra.span textAlign={{ md: "right" }}>
                        Ações
                     </chakra.span>
                  </SimpleGrid>
                  <SimpleGrid
                     spacingY={3}
                     columns={{ base: 1, md: 6 }}
                     w={"full"}
                     py={2}
                     px={6}
                     fontWeight={400}
                     color={THEME.DASHBOARD.TABLE_PRODUCT_ITEM_COLORS}
                     alignItems={"center"}
                  >
                     <chakra.span
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textTransform={"uppercase"}
                        w={"7rem"}
                     >
                        {props.id}
                     </chakra.span>
                     <chakra.span textOverflow="ellipsis" overflow="hidden">
                        {props.title}
                     </chakra.span>
                     <chakra.span textOverflow="ellipsis" overflow="hidden">
                        R$ {props.price}
                     </chakra.span>
                     <chakra.span textOverflow="ellipsis" overflow="hidden">
                        {props.quantity} uni
                     </chakra.span>
                     <chakra.span textOverflow="ellipsis" overflow="hidden">
                        {props.category}
                     </chakra.span>
                     <Flex justify={{ md: "flex-end" }} gap={3}>
                        <ButtonGroup variant="solid" size="sm" spacing={3}>
                           <Popover placement="left" trigger="hover">
                              <PopoverTrigger>
                                 <IconButton
                                    size={"sm"}
                                    rounded={"lg"}
                                    colorScheme="teal"
                                    aria-label="Show item"
                                    icon={<BsFillEyeFill />}
                                 />
                              </PopoverTrigger>
                              <Portal>
                                 <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverHeader>
                                       Informações do Item
                                    </PopoverHeader>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                       <Stack py={4} spacing={4}>
                                          <Box textTransform={"uppercase"}>
                                             ID: {props.id}
                                          </Box>
                                          <Box>Nome: {props.title}</Box>
                                          <Box>
                                             Descrição: {props.description}
                                          </Box>
                                          <Box>Preço: R${props.price}</Box>
                                          <Box>
                                             Quantidade: {props.quantity}{" "}
                                             unidade
                                          </Box>
                                          <Box>Categoria: {props.category}</Box>
                                       </Stack>
                                    </PopoverBody>
                                 </PopoverContent>
                              </Portal>
                           </Popover>

                           <Popover placement="left">
                              <PopoverTrigger>
                                 <IconButton
                                    size={"sm"}
                                    rounded={"lg"}
                                    colorScheme="blue"
                                    aria-label="Update item"
                                    icon={<EditIcon />}
                                 />
                              </PopoverTrigger>
                              <Portal>
                                 <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverHeader>
                                       Atualizar Item
                                    </PopoverHeader>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                       <form>
                                          <Stack
                                             bg={
                                                THEME.DASHBOARD.FORM_BACKGROUND
                                             }
                                             spacing={6}
                                             borderTopRadius={12}
                                             px={4}
                                             py={5}
                                             p={[null, 6]}
                                          >
                                             <Flex
                                                align={"center"}
                                                flexDir={"column"}
                                                gap={5}
                                             >
                                                <Text
                                                   as={"span"}
                                                   fontWeight={600}
                                                >
                                                   ID:{" "}
                                                   <Text
                                                      display={"inline"}
                                                      fontWeight={300}
                                                      textTransform={
                                                         "uppercase"
                                                      }
                                                   >
                                                      {props.id}
                                                   </Text>
                                                </Text>
                                                <Text
                                                   as={"span"}
                                                   fontWeight={700}
                                                >
                                                   Nome:{" "}
                                                   <Text
                                                      as={"u"}
                                                      display={"inline"}
                                                      fontWeight={600}
                                                      fontFamily={"Inter"}
                                                      letterSpacing={2}
                                                   >
                                                      {props.title.toUpperCase()}
                                                   </Text>
                                                </Text>
                                             </Flex>

                                             <SimpleGrid
                                                columns={1}
                                                spacing={2}
                                             >
                                                <FormControl
                                                   isRequired
                                                   as={GridItem}
                                                   colSpan={[6, 3]}
                                                >
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
                                                      onChange={(e) =>
                                                         setTitle(
                                                            e.target.value
                                                         )
                                                      }
                                                   />
                                                </FormControl>

                                                <FormControl
                                                   isRequired
                                                   as={GridItem}
                                                   colSpan={[6, 3]}
                                                >
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
                                                      onChange={(e) =>
                                                         setPrice(
                                                            e.target.value
                                                         )
                                                      }
                                                   />
                                                </FormControl>

                                                <FormControl
                                                   isRequired
                                                   as={GridItem}
                                                   colSpan={[6, 3]}
                                                >
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
                                                      onChange={(e) =>
                                                         setDescription(
                                                            e.target.value
                                                         )
                                                      }
                                                   />
                                                </FormControl>

                                                <FormControl
                                                   isRequired
                                                   as={GridItem}
                                                   colSpan={[6, 3]}
                                                >
                                                   <FormLabelTitle
                                                      title="Quantidade do Produto"
                                                      htmlFor="quantity_product"
                                                   />

                                                   <InputBar
                                                      type="number"
                                                      name="quantity_product"
                                                      id="quantity_product"
                                                      autoComplete="quantity_product"
                                                      placeholder="Digite a quantidade do produto"
                                                      value={quantity}
                                                      onChange={(e) =>
                                                         setQuantity(
                                                            Number(
                                                               e.target.value
                                                            )
                                                         )
                                                      }
                                                   />
                                                </FormControl>

                                                <FormControl
                                                   isRequired
                                                   as={GridItem}
                                                   colSpan={[6, 3]}
                                                >
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
                                                      onChange={(e) =>
                                                         setCategory(
                                                            e.target.value
                                                         )
                                                      }
                                                   />
                                                </FormControl>
                                             </SimpleGrid>
                                          </Stack>
                                          <Box
                                             bg={
                                                THEME.DASHBOARD
                                                   .FORM_FOOTER_BACKGROUND
                                             }
                                             borderBottomRadius={12}
                                             px={{
                                                base: 4,
                                                sm: 6,
                                             }}
                                             py={3}
                                             textAlign={"right"}
                                          >
                                             <IsButton
                                                title="Atualizar"
                                                type="button"
                                                onClick={() => {
                                                   handleUpdateItem(props.id);
                                                   alert.onClose();
                                                }}
                                             />
                                          </Box>
                                       </form>
                                    </PopoverBody>
                                 </PopoverContent>
                              </Portal>
                           </Popover>

                           <Popover placement="left">
                              <PopoverTrigger>
                                 <IconButton
                                    size={"sm"}
                                    rounded={"lg"}
                                    variant="outline"
                                    colorScheme="red"
                                    aria-label="Delete item"
                                    icon={<DeleteIcon />}
                                 />
                              </PopoverTrigger>
                              <Portal>
                                 <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverHeader>
                                       <Text
                                          as={"small"}
                                          textTransform={"uppercase"}
                                       >
                                          ID: {props.id}
                                       </Text>
                                    </PopoverHeader>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                       <Text as={"span"} fontWeight={600}>
                                          Voce deseja deletar este item?
                                       </Text>
                                       <Flex as={"span"} py={4}>
                                          Nome: {props.title}
                                       </Flex>
                                    </PopoverBody>
                                    <PopoverFooter>
                                       <Flex justify={"center"}>
                                          <Button
                                             colorScheme="red"
                                             ml={3}
                                             onClick={() => {
                                                handleDelete(props.id);
                                                alert.onClose();
                                                toast({
                                                   title: `Item com ID ${props.id} deletado`,
                                                   status: "success",
                                                   duration: 10000,
                                                   isClosable: true,
                                                });
                                             }}
                                          >
                                             Deletar
                                          </Button>
                                       </Flex>
                                    </PopoverFooter>
                                 </PopoverContent>
                              </Portal>
                           </Popover>
                        </ButtonGroup>
                     </Flex>
                  </SimpleGrid>
               </Flex>
            ))}
         </TableProductItem>
      </>
   );
}
