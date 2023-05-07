import { memo } from "react";
import {
   Box,
   Stack,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
} from "@chakra-ui/react";
import { BsFillEyeFill } from "react-icons/bs";
import { CategoryType } from "../../../../types/CategoryType";
import { BtnIcon, IsButton } from "../../../../components/Buttons";

interface ModalCategoryHeroProps {
   category: CategoryType;
}

function ModalCategoryHero({ category }: ModalCategoryHeroProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   return (
      <>
         <BtnIcon
            colorScheme="teal"
            aria-label="Show item"
            icon={<BsFillEyeFill />}
            onClick={onOpen}
         />
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>{category.title}</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Stack
                     py={4}
                     spacing={4}
                     alignItems={"center"}
                     justifyContent={"center"}
                  >
                     <Box textTransform={"uppercase"}>ID: {category.id}</Box>
                     <span>Nome: {category.title}</span>
                  </Stack>
               </ModalBody>

               <ModalFooter>
                  <IsButton title="Fechar" onClick={onClose} />
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
}

export default memo(ModalCategoryHero);
