import { memo } from "react";
import {
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
} from "@chakra-ui/react";
import { FormModal } from ".";

interface ModalCreateProduct {
   isOpen: boolean;
   onClose: () => void;
}

function ModalCreateProduct(props: ModalCreateProduct) {
   const { isOpen, onClose } = props;

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Adicionar Produto</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
               <FormModal onClose={onClose} />
            </ModalBody>
         </ModalContent>
      </Modal>
   );
}

export default memo(ModalCreateProduct);
