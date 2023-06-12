import { ReactNode, memo } from 'react'
import {
  Text,
  Flex,
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
import { ButtonModalShow, IsButton } from '../../../../components/Buttons'
import { ProductFormatProps } from '../../../../types/ProductFormatProps'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

interface ModalProductHeroProps {
  product: ProductFormatProps
}

interface ProductsProps {
  label: string
  value: string | number
}

interface TextModalProps {
  title: string
  children: ReactNode
}

const ModalProductHero = ({ product }: ModalProductHeroProps) => {
  const {
    id,
    name,
    price,
    description,
    quantity,
    categoryId,
    supplier,
    createdAt,
    updatedAt,
  } = product
  const { isOpen, onOpen, onClose } = useDisclosure()
  const prodID = id.toUpperCase()
  const createDate = createdAt.format('D [de] MMMM [de] YYYY [às] HH:mm')
  const updateDate = updatedAt.format('D [de] MMMM [de] YYYY [às] HH:mm')

  const PRODUCTS: Array<ProductsProps> = [
    { label: 'ID:', value: prodID },
    { label: 'Nome:', value: name },
    { label: 'Descrição:', value: description },
    { label: 'Preço:', value: price },
    { label: 'Quantidade:', value: quantity },
    { label: 'Categoria:', value: categoryId },
    { label: 'Fornecedor:', value: supplier },
    { label: 'Data de criação:', value: createDate },
  ]

  const TextModal = ({ title, children }: TextModalProps) => (
    <Flex gap={1}>
      <Text color={'purple.600'}>{title}</Text>
      <span>{children}</span>
    </Flex>
  )

  return (
    <>
      <ButtonModalShow aria-label="Show Modal Products" onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={'3xl'}>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              py={4}
              spacing={4}
              alignItems={'center'}
              justifyContent={'center'}
              textAlign={'center'}
            >
              {PRODUCTS.map((props, i) => (
                <TextModal key={i} title={props.label}>
                  {props.value}
                </TextModal>
              ))}

              {updateDate ? (
                <></>
              ) : (
                <TextModal title="Ultima atualização:">{updateDate}</TextModal>
              )}
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

export default memo(ModalProductHero)
