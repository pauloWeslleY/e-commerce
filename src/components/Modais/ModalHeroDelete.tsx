import { memo, useRef } from 'react'
import {
  Box,
  Button,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { ButtonDelete } from '../Buttons'
import { ProductsType } from '../../types/ProductType'
import { UserType } from '../../types/UsersType'

interface ModalHeroDeleteProps {
  title: string
  label?: string
  items?: ProductsType
  user?: UserType
  onHandleDelete: () => void
}

function ModalHeroDelete(props: ModalHeroDeleteProps) {
  const { title, label, user, items, onHandleDelete } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  return (
    <>
      <ButtonDelete aria-label="Delete item" size={'sm'} onClick={onOpen} />

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize={'lg'} fontWeight={'bold'}>
              <Text as={'span'} fontWeight={600}>
                Tem certeza que você deseja excluir {label} {title}?
              </Text>
            </AlertDialogHeader>

            <AlertDialogBody>
              {items ? (
                <Text as={'small'} textTransform={'uppercase'}>
                  ID: {items.id}
                </Text>
              ) : (
                <Text as={'small'} textTransform={'uppercase'}>
                  ID: {user.id}
                </Text>
              )}

              {items ? (
                <Box as={'p'} py={4} fontSize={'lg'}>
                  <span>
                    {title}: {items.name}
                  </span>
                </Box>
              ) : (
                <Box as={'p'} py={4} fontSize={'lg'}>
                  <span>Usuário: {user.username}</span>
                </Box>
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button variant={'ghost'} ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={onHandleDelete} ml={3}>
                excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default memo(ModalHeroDelete)
