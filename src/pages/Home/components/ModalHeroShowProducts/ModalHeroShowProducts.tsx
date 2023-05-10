import { memo } from "react";
import {
   Flex,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   useDisclosure,
   Text,
} from "@chakra-ui/react";
import { BtnIcon, IsButton } from "../../../../components/Buttons";
import { BsFillEyeFill } from "react-icons/bs";
import { ProductsType } from "../../../../types/ProductType";

type ModalHeroShowProductsProps = {
   title: string;
   items: ProductsType[];
};

function ModalHeroShowProducts(props: ModalHeroShowProductsProps) {
   const { items, title } = props;
   const { isOpen, onOpen, onClose } = useDisclosure();

   return (
      <>
         <BtnIcon
            aria-label="Show Products"
            icon={<BsFillEyeFill />}
            bg={"blackAlpha.300"}
            variant={"outline"}
            onClick={onOpen}
         />

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Categoria {title}</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Flex
                     flexDir={"column"}
                     textAlign={"center"}
                     fontWeight={500}
                  >
                     <Text py={4} fontSize={"lg"} fontWeight={500}>
                        Total de Produtos - {items.length}
                     </Text>
                     {items.map((prod, index) => (
                        <span key={index}>{prod.title}</span>
                     ))}
                  </Flex>
               </ModalBody>

               <ModalFooter>
                  <IsButton title="Fechar" onClick={onClose} />
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
}

export default memo(ModalHeroShowProducts);
