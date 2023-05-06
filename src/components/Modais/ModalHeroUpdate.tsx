import { ReactNode, memo } from "react";
import {
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
} from "@chakra-ui/react";
import { ProductsType } from "../../types/ProductType";
import { BtnIcon, IsButton } from "../Buttons";
import { EditIcon } from "@chakra-ui/icons";

interface ModalHeroUpdateProps {
   items: ProductsType;
   children: ReactNode;
   onHandleClick: () => void;
}

function ModalHeroUpdate(props: ModalHeroUpdateProps) {
   const { children, items, onHandleClick } = props;
   const { isOpen, onOpen, onClose } = useDisclosure();

   return (
      <>
         <BtnIcon
            colorScheme="blue"
            aria-label="Update item"
            icon={<EditIcon />}
            onClick={onOpen}
         />

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>{items.title}</ModalHeader>
               <ModalCloseButton />
               <ModalBody>{children}</ModalBody>
               <ModalFooter>
                  <IsButton
                     title="Atualizar"
                     type="button"
                     onClick={() => {
                        onHandleClick();
                        onClose();
                     }}
                  />
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
}

export default memo(ModalHeroUpdate);
