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
} from "@chakra-ui/react";
import { BtnIcon, IsButton } from "../../../../components/Buttons";
import { BsFillEyeFill } from "react-icons/bs";

type ModalHeroShowProductsProps = {
   title: string;
   items: any;
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
               <ModalHeader pt={4} fontSize={"lg"} fontWeight={500}>
                  Produtos {title} - {items.length}
               </ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Flex
                     flexDir={"column"}
                     textAlign={"center"}
                     fontWeight={500}
                  >
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
