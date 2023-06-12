import { memo } from 'react'
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Box,
  IconButton,
} from '@chakra-ui/react'
import { IsButton } from '../../../../components/Buttons'
import { BsFillEyeFill } from 'react-icons/bs'
import { ProductsType } from '../../../../types/ProductType'
import { useThemeColors } from '../../../../hooks/useThemeColors'

type ModalHeroShowProductsProps = {
  title: string
  product?: ProductsType[]
}

function ModalHeroShowProducts(props: ModalHeroShowProductsProps) {
  const { product, title } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { THEME } = useThemeColors()

  return (
    <>
      <IconButton
        aria-label="Show Products"
        icon={<BsFillEyeFill />}
        size={'sm'}
        variant={'ghost'}
        bg={THEME.BUTTONS.BTN_ICON_BACKGROUND}
        transition={'bg .2s ease-in'}
        _hover={{
          bg: 'purple.600',
        }}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Categoria {title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={'column'} textAlign={'center'} fontWeight={'medium'}>
              <Text py={4} fontSize={'xl'} fontWeight={'medium'}>
                Total de Produtos -{' '}
                <Text display={'inline-block'} fontWeight={'semibold'}>
                  {product.length}
                </Text>
              </Text>

              {product.map(prod => (
                <Box
                  key={prod.id}
                  as={'h4'}
                  color={'purple.600'}
                  fontWeight={'medium'}
                  fontSize={'lg'}
                  letterSpacing={'wide'}
                  lineHeight={'shorter'}
                >
                  <span>{prod.name}</span>
                </Box>
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <IsButton title="Fechar" onClick={onClose} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default memo(ModalHeroShowProducts)
