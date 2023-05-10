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
import { Flex, useToast, useDisclosure } from "@chakra-ui/react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { db } from "../../../../services/firebase";
import { useColors } from "../../../../hooks/useColors";
import { useLoading } from "../../../../hooks/useLoading";
import { ProductsType } from "../../../../types/ProductType";
import { NavBar } from "../../../../components/NavBar";
import { Loading } from "../../../../components/Loading";
import { DrawerHero } from "../../../../components/DrawerHero";
import {
   ModalHeroDelete,
   ModalHeroUpdate,
} from "../../../../components/Modais";
import {
   HeroTableColumn,
   HeroTableHeader,
   HeroTableProductItem,
} from "../TableProduct";
import {
   FormFooterHero,
   FormHeroBox,
   FormHeroProduct,
   FormStackContainer,
} from "../HeroFormProduct";

function AddProduct() {
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
   const [quantity, setQuantity] = useState<number>(0);
   const { THEME } = useColors();
   const { isLoading } = useLoading();
   const navBarToggle = useDisclosure();
   const toast = useToast();
   const prodCollectionRef = collection(db, "items");

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
         if (title.length === 0) {
            toast({
               title: "Preencha os campos!",
               status: "error",
               duration: 9000,
               isClosable: true,
            });
         } else if (querySnapshot.empty) {
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
         if (title.length === 0) {
            toast({
               title: "Preencher os campos!",
               status: "error",
               duration: 9000,
               isClosable: true,
            });
         } else if (item && title.length !== 0) {
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

      getItems();
   }, []);

   if (isLoading) {
      return <Loading />;
   }

   return (
      <>
         <NavBar
            label="Tabela de Produtos"
            title="Criar Produto"
            onOpen={navBarToggle.onOpen}
            icon={HiOutlineShoppingBag}
         />

         <DrawerHero
            isOpen={navBarToggle.isOpen}
            onClose={navBarToggle.onClose}
         >
            <FormHeroBox onHandleSubmit={handleAddItem}>
               <FormStackContainer bg={THEME.DASHBOARD.FORM_BACKGROUND}>
                  <FormHeroProduct
                     valueTitle={title}
                     valuePrice={price}
                     valueDescription={description}
                     valueQuantity={quantity}
                     valueCategory={category}
                     onHandleChangeTitle={(e) => setTitle(e.target.value)}
                     onHandleChangePrice={(e) => setPrice(e.target.value)}
                     onHandleChangeDescription={(e) =>
                        setDescription(e.target.value)
                     }
                     onHandleChangeQuantity={(e) =>
                        setQuantity(Number(e.target.value))
                     }
                     onHandleChangeCategory={(e) => setCategory(e.target.value)}
                  />
               </FormStackContainer>
               <FormFooterHero onHandleClick={navBarToggle.onToggle} />
            </FormHeroBox>
         </DrawerHero>

         <HeroTableProductItem>
            {items.map((props, i) => (
               <Flex
                  key={`${props.id}${i}`}
                  flexDir={{ base: "row", md: "column" }}
                  bg={THEME.DASHBOARD.TABLE_PRODUCT_LINE_BG}
               >
                  <HeroTableHeader />
                  <HeroTableColumn items={props}>
                     <ModalHeroUpdate
                        title="Produto"
                        items={props}
                        onHandleClick={() => handleUpdateItem(props.id)}
                     >
                        <FormStackContainer
                           bg={THEME.DASHBOARD.POPOVER_BACKGROUND}
                        >
                           <FormHeroProduct
                              valueTitle={title}
                              valuePrice={price}
                              valueDescription={description}
                              valueQuantity={quantity}
                              valueCategory={category}
                              onHandleChangeTitle={(e) =>
                                 setTitle(e.target.value)
                              }
                              onHandleChangePrice={(e) =>
                                 setPrice(e.target.value)
                              }
                              onHandleChangeDescription={(e) =>
                                 setDescription(e.target.value)
                              }
                              onHandleChangeQuantity={(e) =>
                                 setQuantity(Number(e.target.value))
                              }
                              onHandleChangeCategory={(e) =>
                                 setCategory(e.target.value)
                              }
                           />
                        </FormStackContainer>
                     </ModalHeroUpdate>

                     <ModalHeroDelete
                        title="Item"
                        items={props}
                        onHandleDelete={() => {
                           handleDelete(props.id);
                           toast({
                              title: `Item ${props.title} deletado`,
                              status: "success",
                              duration: 10000,
                              isClosable: true,
                           });
                        }}
                     />
                  </HeroTableColumn>
               </Flex>
            ))}
         </HeroTableProductItem>
      </>
   );
}

export default memo(AddProduct);
