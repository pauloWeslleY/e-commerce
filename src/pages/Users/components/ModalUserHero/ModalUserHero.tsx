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
import { BsFillEyeFill } from 'react-icons/bs'
import { UserType } from '../../../../types/UsersType'
import { BtnIcon, IsButton } from '../../../../components/Buttons'
import { useColors } from '../../../../hooks/useColors'

interface ModalUserHeroProps {
  user: UserType
}

function ModalUserHero({ user }: ModalUserHeroProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { THEME } = useColors()

  return (
    <>
      <BtnIcon
        bg={'emerald.400'}
        color={'whiteAlpha.900'}
        borderColor={'transparent'}
        borderWidth={2}
        transition={'ease-in-out .4s 100ms'}
        _hover={{
          bg: THEME.BUTTONS.BTN_ICON_BACKGROUND,
          color: 'emerald.700',
          borderColor: 'emerald.600',
        }}
        aria-label="Show item"
        icon={<BsFillEyeFill />}
        onClick={onOpen}
      />
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
