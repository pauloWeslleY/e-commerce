import { ReactNode, memo } from 'react'
import {
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { ProductsType } from '../../types/ProductType'
import { CategoryType } from '../../types/CategoryType'
import { ButtonModalUpdate, IsButton } from '../Buttons'

interface ModalHeroUpdateProps {
  title: string
  items?: ProductsType
  category?: CategoryType
  children: ReactNode
  isValid: boolean
  onHandleClick: () => void
}

const ModalHeroUpdate = (props: ModalHeroUpdateProps) => {
  const { title, children, onHandleClick, items, category, isValid } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ButtonModalUpdate
        size={'sm'}
        aria-label="Update item"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={['lg', '5xl']}>
          <ModalHeader>Atualizar {title}</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Flex align={'center'} flexDir={'column'} gap={5}>
              <Text as={'span'} fontWeight={'semibold'}>
                ID:{' '}
                <Text
                  display={'inline'}
                  fontWeight={'light'}
                  textTransform={'uppercase'}
                >
                  {items ? <>{items.id}</> : <>{category.id}</>}
                </Text>
              </Text>
              <Text as={'span'} fontWeight={600}>
                Nome:{' '}
                <Text
                  as={'p'}
                  display={'inline'}
                  fontFamily={'Inter'}
                  fontSize={'xl'}
                  fontWeight={500}
                >
                  {items ? <>{items.name}</> : <>{category.name}</>}
                </Text>
              </Text>
            </Flex>

            {children}
          </ModalBody>
          <ModalFooter>
            <Flex gap={2}>
              <IsButton title="Cancelar" type="button" onClick={onClose} />
              <IsButton
                title="Atualizar"
                type="button"
                isDisabled={!isValid}
                onClick={() => {
                  onHandleClick()
                  onClose()
                }}
              />
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default memo(ModalHeroUpdate)
