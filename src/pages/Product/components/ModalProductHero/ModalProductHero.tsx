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
import { BsFillEyeFill } from 'react-icons/bs'
import { ProductsType } from '../../../../types/ProductType'
import { BtnIcon, IsButton } from '../../../../components/Buttons'
import { convertTimestampToDayjs } from '../../../../utils/convertTimestampToDayjs'
import { useColors } from '../../../../hooks/useColors'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

interface ModalProductHeroProps {
  product: ProductsType
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
    createAt,
    updateAt,
  } = product
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { THEME } = useColors()
  const prodID = id.toUpperCase()
  const createdAt = convertTimestampToDayjs(createAt)
  const today = createdAt.format('D [de] MMMM [de] YYYY [às] HH:mm')
  const updatedAt = convertTimestampToDayjs(updateAt)
  const dayUpdate = updatedAt.format('D [de] MMMM [de] YYYY [às] HH:mm')

  const PRODUCTS: Array<ProductsProps> = [
    { label: 'ID:', value: prodID },
    { label: 'Nome:', value: name },
    { label: 'Descrição:', value: description },
    { label: 'Preço:', value: price },
    { label: 'Quantidade:', value: quantity },
    { label: 'Categoria:', value: categoryId },
    { label: 'Fornecedor:', value: supplier },
    { label: 'Data de criação:', value: today },
  ]

  const TextModal = ({title, children}: TextModalProps) => (
    <Flex gap={2}>
      <Text color={'purple.600'}>
        {title}
      </Text>
      <span>{children}</span>
    </Flex>
  )

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
                  <span>{props.value}</span>
                </TextModal>
              ))}

              {updateAt ?
                (
                  <TextModal title="Ultima atualização:">
                    <span>{dayUpdate}</span>
                  </TextModal>
                ) : (
                  <></>
                )
              }
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
