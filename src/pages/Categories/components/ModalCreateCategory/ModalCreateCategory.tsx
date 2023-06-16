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
          <Text as={'h3'} fontFamily={'Poppins'} fontWeight={'medium'}>
            Criar Categoria
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        {/* <ModalFooter>
          <ButtonGroup spacing={2}>
            <IsButton title="Fechar" onClick={onClose} />
          </ButtonGroup>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  )
}

export default memo(ModalCreateCategory)
