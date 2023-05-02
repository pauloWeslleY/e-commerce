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
   chakra,
   useDisclosure,
   IconButton,
   Collapse,
   useToast,
   Button,
   UnorderedList,
   ListItem,
   Flex,
   Text,
   Popover,
   PopoverTrigger,
   PopoverContent,
   Portal,
   PopoverBody,
   PopoverCloseButton,
   PopoverHeader,
   PopoverArrow,
   PopoverFooter,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { db } from "../../../../services/firebase";
import { CategoryType } from "../../../../types/CategoryType";
import { useColors } from "../../../../hooks/useColors";
import { NavBar } from "../../../../components/NavBar";
import { FormLabelTitle } from "../../../../components/FormLabelTitle";
import { InputBar } from "../../../../components/InputBar";
import { IsButton } from "../../../../components/Buttons";
import { BiCategory } from "react-icons/bi";

export function AddCategory() {
   const [category, setCategory] = useState<CategoryType[]>([]);
   const [name, setName] = useState<string>("");
   const { THEME } = useColors();
   const alert = useDisclosure();
   const navBarToggle = useDisclosure();
   const cateCollectionRef = collection(db, "categories");
   const toast = useToast();

   const isCategory: CategoryType = {
      name,
   };

   const handleAddCategory = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
         const data = query(
            collection(db, "category"),
            where("name", "==", name)
         );
         const querySnapshot = await getDocs(data);

         if (querySnapshot.empty) {
            const docRef = await addDoc(cateCollectionRef, isCategory);
            setCategory([...category, { id: docRef.id, ...isCategory }]);
            setName("");

            toast({
               title: "Categoria Cadastrada!",
               status: "success",
               duration: 9000,
               isClosable: true,
            });
         } else {
            toast({
               title: "Essa Categoria já existe!",
               status: "error",
               duration: 9000,
               isClosable: true,
            });
         }
      } catch (error) {
         console.log(error);
         toast({
            title: "Falha ao cria categoria!",
            status: "error",
            duration: 9000,
            isClosable: true,
         });
      }
   };

   const handleUpdated = async (id: string) => {
      try {
         const categoryId = category.some((props) => props.id === id);
         if (categoryId && name.length !== 0) {
            const categories = category.map((category) =>
               category.id === id ? { id, ...isCategory } : category
            );
            await updateDoc(doc(db, "categories", id), isCategory);
            setCategory(categories);
            toast({
               title: "Categoria Atualizada!",
               status: "success",
               duration: 9000,
               isClosable: true,
            });
         } else {
            toast({
               title: "Categoria já atualizada!",
               status: "warning",
               duration: 9000,
               isClosable: true,
            });
         }
      } catch (error) {
         toast({
            title: "Falha ao cadastrar categoria!",
            status: "error",
            duration: 9000,
            isClosable: true,
         });
      }
   };

   const handleDelete = async (id: string) => {
      await deleteDoc(doc(db, "categories", id));
      setCategory(category.filter((item) => item.id !== id));
   };

   useEffect(() => {
      const getCategories = async () => {
         const data = await getDocs(cateCollectionRef);
         const category = data.docs.map<CategoryType>((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setCategory(category);
      };
      getCategories();
   }, []);

   return (
      <>
         <NavBar
            label="Categorias do Produtos"
            title="Criar Categoria"
            onOpen={navBarToggle.onToggle}
            icon={BiCategory}
         />

         {/* NOTE: Category creation form */}
         <Collapse in={navBarToggle.isOpen} animateOpacity>
            <Box mt={[10, 0]} mb={8}>
               <chakra.form
                  onSubmit={handleAddCategory}
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
                     <SimpleGrid columns={12} spacing={6}>
                        <FormControl isRequired as={GridItem} colSpan={[1, 12]}>
                           <FormLabelTitle
                              title="Nome da Categoria"
                              htmlFor="name_category"
                           />

                           <InputBar
                              type="text"
                              name="name_category"
                              id="name_category"
                              autoComplete="name_category"
                              placeholder="Digite o nome do categoria"
                              value={name}
                              onChange={(event) => setName(event.target.value)}
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

         {/* HACK: List Categories */}
         <UnorderedList listStyleType={"none"} spacing={2}>
            {category.map((props) => (
               <Box key={props.id}>
                  <Flex
                     align={"center"}
                     justify={"space-between"}
                     gap={6}
                     py={2}
                     px={4}
                     rounded={"md"}
                     shadow={"md"}
                     bg={"whiteAlpha.100"}
                     mb={2}
                  >
                     <ListItem>
                        <Text
                           as={"h3"}
                           fontFamily={"Inter"}
                           fontSize={"md"}
                           fontWeight={500}
                        >
                           {props.name}
                        </Text>
                     </ListItem>
                     <Flex gap={2}>
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
                                 <PopoverHeader>Atualizar Item</PopoverHeader>
                                 <PopoverCloseButton />
                                 <PopoverBody>
                                    <form>
                                       <Stack
                                          bg={
                                             THEME.DASHBOARD.POPOVER_BACKGROUND
                                          }
                                          spacing={6}
                                          px={4}
                                          py={5}
                                          p={[null, 6]}
                                       >
                                          <Flex
                                             align={"center"}
                                             flexDir={"column"}
                                             gap={5}
                                          >
                                             <Text as={"span"} fontWeight={600}>
                                                ID:{" "}
                                                <Text
                                                   display={"inline"}
                                                   fontWeight={300}
                                                   textTransform={"uppercase"}
                                                >
                                                   {props.id}
                                                </Text>
                                             </Text>
                                             <Text as={"span"} fontWeight={700}>
                                                Nome:{" "}
                                                <Text
                                                   as={"u"}
                                                   display={"inline"}
                                                   fontWeight={600}
                                                   fontFamily={"Inter"}
                                                   letterSpacing={2}
                                                >
                                                   {props.name.toUpperCase()}
                                                </Text>
                                             </Text>
                                          </Flex>
                                          <SimpleGrid columns={12} spacing={6}>
                                             <FormControl
                                                as={GridItem}
                                                colSpan={12}
                                                isRequired
                                             >
                                                <FormLabelTitle
                                                   title="Nome do Categoria"
                                                   htmlFor="name_category"
                                                />

                                                <InputBar
                                                   type="text"
                                                   name="name_category"
                                                   id="name_category"
                                                   autoComplete="name_category"
                                                   placeholder="Digite o nome do categoria"
                                                   value={name}
                                                   onChange={(event) =>
                                                      setName(
                                                         event.target.value
                                                      )
                                                   }
                                                />
                                             </FormControl>
                                          </SimpleGrid>
                                       </Stack>
                                       <Box
                                          bg={
                                             THEME.DASHBOARD.POPOVER_BACKGROUND
                                          }
                                          px={{
                                             base: 4,
                                             sm: 6,
                                          }}
                                          py={3}
                                          textAlign={"right"}
                                       >
                                          <IsButton
                                             title="Atualizar"
                                             onClick={() =>
                                                handleUpdated(props.id)
                                             }
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
                                    <Text as={"small"}>ID: {props.id}</Text>
                                 </PopoverHeader>
                                 <PopoverCloseButton />
                                 <PopoverBody>
                                    <Text as={"span"} fontWeight={600}>
                                       Voce quer deletar essa categoria?
                                    </Text>
                                    <Flex as={"span"} py={4}>
                                       Categoria: {props.name}
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
                     </Flex>
                  </Flex>
               </Box>
            ))}
         </UnorderedList>
      </>
   );
}
