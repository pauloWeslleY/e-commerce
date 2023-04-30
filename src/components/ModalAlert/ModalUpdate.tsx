import { ReactNode, memo } from "react";
import {
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
} from "@chakra-ui/react";

interface ModalUpdateProps {
   isOpen: boolean;
   onClose: () => void;
   children: ReactNode;
}

function ModalUpdate(props: ModalUpdateProps) {
   const { isOpen, onClose, children } = props;

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader fontSize={"lg"} fontWeight={800} fontFamily={"Inter"}>
               Atualizar Item
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>{children}</ModalBody>
         </ModalContent>
      </Modal>
   );
}

export default memo(ModalUpdate);