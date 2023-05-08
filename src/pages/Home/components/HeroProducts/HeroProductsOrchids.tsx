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
import { useProduct } from "../../../../hooks/useProduct";
import { BtnIcon, IsButton } from "../../../../components/Buttons";
import { BsFillEyeFill } from "react-icons/bs";

function HeroProductsOrchids() {
   const { itemsOrchids } = useProduct();
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
                  Produtos Orquídeas - {itemsOrchids.length}
               </ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Flex
                     flexDir={"column"}
                     textAlign={"center"}
                     fontWeight={500}
                  >
                     {itemsOrchids.map((prod, index) => (
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

export default memo(HeroProductsOrchids);
