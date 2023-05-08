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
import { BsFillEyeFill } from "react-icons/bs";
import { BtnIcon, IsButton } from "../../../../components/Buttons";
import { useProduct } from "../../../../hooks/useProduct";

function HeroProductsElectronics() {
   const { itemsElectronics } = useProduct();
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
                  Produtos Eletrônicos - {itemsElectronics.length}
               </ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Flex
                     flexDir={"column"}
                     textAlign={"center"}
                     fontWeight={500}
                  >
                     {itemsElectronics.map((prod, index) => (
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

export default memo(HeroProductsElectronics);
