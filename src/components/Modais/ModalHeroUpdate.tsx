import { ReactNode, memo } from "react";
import {
   Flex,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { ProductsType } from "../../types/ProductType";
import { CategoryType } from "../../types/CategoryType";
import { BtnIcon, IsButton } from "../Buttons";

interface ModalHeroUpdateProps {
   title: string;
   items?: ProductsType;
   category?: CategoryType;
   children: ReactNode;
   onHandleClick: () => void;
}

function ModalHeroUpdate(props: ModalHeroUpdateProps) {
   const { title, children, onHandleClick } = props;
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
               <ModalHeader>Atualizar {title}</ModalHeader>

               <ModalCloseButton />
               <ModalBody>{children}</ModalBody>
               <ModalFooter>
                  <Flex gap={2}>
                     <IsButton
                        title="Cancelar"
                        type="button"
                        onClick={onClose}
                     />
                     <IsButton
                        title="Atualizar"
                        type="button"
                        onClick={() => {
                           onHandleClick();
                           onClose();
                        }}
                     />
                  </Flex>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
}

export default memo(ModalHeroUpdate);
