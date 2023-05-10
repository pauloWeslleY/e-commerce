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
   Flex,
   VStack,
   StackDivider,
   Collapse,
   Text,
   useDisclosure,
   useToast,
} from "@chakra-ui/react";
import { BiCategory } from "react-icons/bi";
import { db } from "../../../../services/firebase";
import { CategoryType } from "../../../../types/CategoryType";
import { NavBar } from "../../../../components/NavBar";
import { FormCategoryHero, FormCategoryHeroUpdate } from "../FormCategoryHero";
import { HeroCategoryContainer } from "../HeroCategoryContainer";
import {
   ModalHeroDelete,
   ModalHeroUpdate,
} from "../../../../components/Modais";

function HeroCategories() {
   const [category, setCategory] = useState<CategoryType[]>([]);
   const [title, setTitle] = useState<string>("");

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
            <FormCategoryHero
               onHandleSubmit={handleAddCategory}
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               onHandleClick={navBarToggle.onToggle}
            />
         </Collapse>

         {/* HACK: List Categories */}
         <VStack
            divider={<StackDivider borderColor={"purple.200"} />}
            spacing={4}
            align={"stretch"}
         >
            {category.map((props) => (
               <HeroCategoryContainer key={props.id}>
                  <Text
                     as={"h3"}
                     fontFamily={"Inter"}
                     fontSize={"md"}
                     fontWeight={500}
                  >
                     {props.title}
                  </Text>
                  <Flex gap={2}>
                     <ModalHeroUpdate
                        title="Categoria"
                        category={props}
                        onHandleClick={() => handleUpdatedCategory(props.id)}
                     >
                        <FormCategoryHeroUpdate
                           value={title}
                           onChange={(event) => setTitle(event.target.value)}
                        />
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
               </HeroCategoryContainer>
            ))}
         </VStack>
      </>
   );
}

export default memo(HeroCategories);
