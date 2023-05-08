import { useState, useEffect, FormEvent, memo } from "react";
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
   Flex,
   Stack,
   VStack,
   StackDivider,
   FormControl,
   SimpleGrid,
   GridItem,
   Collapse,
   Text,
   chakra,
   useDisclosure,
   useToast,
} from "@chakra-ui/react";
import { BiCategory } from "react-icons/bi";
import { db } from "../../../../services/firebase";
import { CategoryType } from "../../../../types/CategoryType";
import { useColors } from "../../../../hooks/useColors";
import { NavBar } from "../../../../components/NavBar";
import { FormLabelTitle } from "../../../../components/FormLabelTitle";
import { InputBar } from "../../../../components/InputBar";
import { IsButton } from "../../../../components/Buttons";
import {
   ModalHeroDelete,
   ModalHeroUpdate,
} from "../../../../components/Modais";
import ModalCategoryHero from "./ModalCategoryHero";

function AddCategory() {
   const [category, setCategory] = useState<CategoryType[]>([]);
   const [title, setTitle] = useState<string>("");
   const { THEME } = useColors();
   const navBarToggle = useDisclosure();
   const cateCollectionRef = collection(db, "categories");
   const toast = useToast();

   const isCategory: CategoryType = {
      title,
   };

   const handleAddCategory = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
         const data = query(
            collection(db, "category"),
            where("title", "==", title)
         );
         const querySnapshot = await getDocs(data);

         if (title.length === 0) {
            toast({
               title: "Preencha os campos!",
               status: "error",
               duration: 9000,
               isClosable: true,
            });
         } else if (querySnapshot.empty) {
            const docRef = await addDoc(cateCollectionRef, isCategory);
            setCategory([...category, { id: docRef.id, ...isCategory }]);
            setTitle("");

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

   const handleUpdatedCategory = async (id: string) => {
      try {
         const categoryId = category.some((props) => props.id === id);

         if (title.length === 0) {
            toast({
               title: "Preencher os campos!",
               status: "error",
               duration: 9000,
               isClosable: true,
            });
         } else if (categoryId && title.length !== 0) {
            const categories = category.map((category) =>
               category.id === id ? { id, ...isCategory } : category
            );
            await updateDoc(doc(db, "categories", id), isCategory);
            setCategory(categories);
            setTitle("");
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
                              value={title}
                              onChange={(event) => setTitle(event.target.value)}
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
         <VStack
            divider={<StackDivider borderColor={"purple.200"} />}
            spacing={4}
            align={"stretch"}
         >
            {category.map((props) => (
               <Flex
                  key={props.id}
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
                  <Text
                     as={"h3"}
                     fontFamily={"Inter"}
                     fontSize={"md"}
                     fontWeight={500}
                  >
                     {props.title}
                  </Text>
                  <Flex gap={2}>
                     <ModalCategoryHero category={props} />

                     <ModalHeroUpdate
                        title="Categoria"
                        category={props}
                        onHandleClick={() => handleUpdatedCategory(props.id)}
                     >
                        <form>
                           <Stack
                              bg={THEME.DASHBOARD.POPOVER_BACKGROUND}
                              spacing={6}
                              px={4}
                              py={5}
                              p={[null, 6]}
                           >
                              <Flex align={"center"} flexDir={"column"} gap={5}>
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
                                       {props.title.toUpperCase()}
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
                                       value={title}
                                       onChange={(event) =>
                                          setTitle(event.target.value)
                                       }
                                    />
                                 </FormControl>
                              </SimpleGrid>
                           </Stack>
                        </form>
                     </ModalHeroUpdate>

                     <ModalHeroDelete
                        title="Categoria"
                        items={props}
                        onHandleDelete={() => {
                           handleDelete(props.id);
                           toast({
                              title: `Categoria com ID ${props.id} deletado`,
                              status: "success",
                              duration: 10000,
                              isClosable: true,
                           });
                        }}
                     />
                  </Flex>
               </Flex>
            ))}
         </VStack>
      </>
   );
}

export default memo(AddCategory);
