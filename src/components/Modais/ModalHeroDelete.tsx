import { memo, useRef } from "react";
import {
   AlertDialog,
   AlertDialogBody,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogOverlay,
   Button,
   Flex,
   Text,
   useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { BtnIcon } from "../Buttons";
import { ProductsType } from "../../types/ProductType";

interface ModalHeroDeleteProps {
   items: ProductsType;
   onHandleDelete: () => void;
}

function ModalHeroDelete(props: ModalHeroDeleteProps) {
   const { items, onHandleDelete } = props;
   const { isOpen, onOpen, onClose } = useDisclosure();
   const cancelRef = useRef();

   return (
      <>
         <BtnIcon
            variant="outline"
            colorScheme="red"
            aria-label="Delete item"
            icon={<DeleteIcon />}
            onClick={onOpen}
         />

         <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
         >
            <AlertDialogOverlay>
               <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                     <Text as={"small"} textTransform={"uppercase"}>
                        ID: {items.id}
                     </Text>
                  </AlertDialogHeader>

                  <AlertDialogBody>
                     <Text as={"span"} fontWeight={600}>
                        Voce deseja deletar este item?
                     </Text>
                     <Flex as={"span"} py={4}>
                        Item: {items.title}
                     </Flex>
                  </AlertDialogBody>

                  <AlertDialogFooter>
                     <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                     </Button>
                     <Button colorScheme="red" onClick={onHandleDelete} ml={3}>
                        Delete
                     </Button>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialogOverlay>
         </AlertDialog>
      </>
   );
}

export default memo(ModalHeroDelete);
