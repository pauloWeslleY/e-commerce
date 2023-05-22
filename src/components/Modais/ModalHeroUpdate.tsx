import { ReactNode, memo } from 'react'
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { ProductsType } from '../../types/ProductType'
import { CategoryType } from '../../types/CategoryType'
import { BtnIcon, IsButton } from '../Buttons'

interface ModalHeroUpdateProps {
  title: string
  items?: ProductsType
  category?: CategoryType
  children: ReactNode
  onHandleClick: () => void
}

function ModalHeroUpdate(props: ModalHeroUpdateProps) {
  const { title, children, onHandleClick, items, category } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <BtnIcon
        colorScheme="blue"
        aria-label="Update item"
        icon={<EditIcon />}
        onClick={onOpen}
        variant={'solid'}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={['xl', '5xl']}>
          <ModalHeader>Atualizar {title}</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Flex align={'center'} flexDir={'column'} gap={5}>
              <Text as={'span'} fontWeight={600}>
                ID:{' '}
                <Text
                  display={'inline'}
                  fontWeight={300}
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
