import { memo } from 'react'
import {
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

function ModalProductHero({ product }: ModalProductHeroProps) {
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

  const lastUpdate = updateAt ? `Ultima atualização: ${dayUpdate}` : ''

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
              <span>ID: {prodID}</span>
              <span>Nome: {name}</span>
              <span>Descrição: {description}</span>
              <span>Preço: {price}</span>
              <span>Quantidade: {quantity}</span>
              <span>Categoria: {categoryId}</span>
              {supplier ? <span>Fornecedor: {supplier}</span> : <></>}
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
  )
}

export default memo(ModalProductHero)
