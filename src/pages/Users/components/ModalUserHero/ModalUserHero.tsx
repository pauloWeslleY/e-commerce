import { memo } from 'react'
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
} from '@chakra-ui/react'
import { UserType } from '../../../../types/UsersType'
import { ButtonModalShow, IsButton } from '../../../../components/Buttons'

interface ModalUserHeroProps {
  user: UserType
}

function ModalUserHero({ user }: ModalUserHeroProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ButtonModalShow aria-label="Show Modal User" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.username}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              py={4}
              spacing={4}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Box textTransform={'uppercase'}>ID: {user.id}</Box>
              <span>Nome: {user.username}</span>
              <span>Email: {user.email}</span>
              <span>Password: {user.password}</span>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <IsButton title="Fechar" onClick={onClose} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default memo(ModalUserHero)
