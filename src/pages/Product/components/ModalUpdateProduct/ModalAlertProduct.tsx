import { ReactNode, memo } from "react";
import {
   Box,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   Text,
} from "@chakra-ui/react";

interface ModalAlertProductProps {
   isOpen: boolean;
   onClose: () => void;
   children: ReactNode;
}

function ModalAlertProduct(props: ModalAlertProductProps) {
   const { isOpen, onClose, children } = props;

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader fontSize={"lg"} fontWeight={800} fontFamily={"Inter"}>
               Deleta Produto
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
               <Box py={8}>
                  <Text fontFamily={"Inter"} fontSize={"lg"} fontWeight={500}>
                     Realmente Desejar Deletar este produto?
                  </Text>
               </Box>
               {children}
            </ModalBody>
         </ModalContent>
      </Modal>
   );
}

export default memo(ModalAlertProduct);
