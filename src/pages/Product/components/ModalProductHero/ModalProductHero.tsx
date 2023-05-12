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
import { ProductsType } from "../../../../types/ProductType";
import { BtnIcon, IsButton } from "../../../../components/Buttons";
import { convertTimestampToDayjs } from "../../../../utils/convertTimestampToDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
dayjs.locale("pt-br");

interface ModalProductHeroProps {
   items: ProductsType;
}

function ModalProductHero({ items }: ModalProductHeroProps) {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const createdAt = convertTimestampToDayjs(items.createAt);
   const today = createdAt.format("D [de] MMMM [de] YYYY [às] HH:mm");

   const updatedAt = convertTimestampToDayjs(items.updateAt);
   const dayUpdate = updatedAt.format("D [de] MMMM [de] YYYY [às] HH:mm");

   const lastUpdate = items.updateAt ? `Ultima atualização: ${dayUpdate}` : "";

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
               <ModalHeader>{items.title}</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Stack
                     py={4}
                     spacing={4}
                     alignItems={"center"}
                     justifyContent={"center"}
                     textAlign={"center"}
                  >
                     <Box textTransform={"uppercase"}>ID: {items.id}</Box>
                     <span>Nome: {items.title}</span>
                     <span>Descrição: {items.description}</span>
                     <span>Preço: R${items.price}</span>
                     <span>Quantidade: {items.quantity} unidades</span>
                     <span>Categoria: {items.category}</span>
                     <span>Data de criação: {today}</span>
                     <span>{lastUpdate}</span>
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

export default memo(ModalProductHero);
