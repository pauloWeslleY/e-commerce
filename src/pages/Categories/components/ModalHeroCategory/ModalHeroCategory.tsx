import { memo } from 'react'
import {
  Flex,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { ButtonModalShow, IsButton } from '../../../../components/Buttons'
import { ProductsType } from '../../../../types/ProductType'

interface ModalHeroCategoryProps {
  title: string
  products: ProductsType[]
}

const ModalHeroCategory = (props: ModalHeroCategoryProps) => {
  const { title, products } = props
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <ButtonModalShow aria-label="Show Products" onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Categoria {title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={'column'} textAlign={'center'} fontWeight={'medium'}>
              <Text py={4} fontSize={'xl'} fontWeight={'medium'}>
                Total de Produtos -{' '}
                <Text
                  as={'span'}
                  display={'inline-block'}
                  fontWeight={'semibold'}
                >
                  {products.length}
                </Text>
              </Text>

              {products.map(prod => (
                <Box
                  key={prod.id}
                  as={'h4'}
                  color={'violet.400'}
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

export default memo(ModalHeroCategory)
