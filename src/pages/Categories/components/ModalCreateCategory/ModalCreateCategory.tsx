import { ReactNode, memo } from 'react'
import {
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
// import { IsButton } from '../../../../components/Buttons'
import { CategoriesProps } from '../../../../types/CategoriesProps'

interface ModalCreateCategoryProps {
  category?: CategoriesProps[]
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

function ModalCreateCategory(props: ModalCreateCategoryProps) {
  const { children, onClose, isOpen } = props

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={['md', '3xl']}>
        <ModalHeader>
          <Text as={'h3'} fontWeight={'medium'}>
            Criar Categoria
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default memo(ModalCreateCategory)
