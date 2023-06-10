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

type ModalHeroShowProductsProps = {
  title: string
  product?: ProductsType[]
}

function ModalHeroShowProducts(props: ModalHeroShowProductsProps) {
  const { product, title } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        aria-label="Show Products"
        icon={<BsFillEyeFill />}
        size={'sm'}
        bg={'blackAlpha.300'}
        variant={'ghost'}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Categoria {title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={'column'} textAlign={'center'} fontWeight={500}>
              <Text py={4} fontSize={'xl'} fontWeight={500}>
                Total de Produtos - {product.length}
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
