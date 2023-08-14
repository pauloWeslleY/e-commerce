import { Flex, FlexProps, Text } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { ProductsType } from '../../../../types/ProductType'

interface CardFilterByCategoryProps extends FlexProps {
  id?: string
  name: string
  product?: ProductsType[]
}

interface CardsFilterProps {
  cards: CardFilterByCategoryProps
}

export const CardFilterByCategory = ({ cards }: CardsFilterProps) => {
  const { name, ...rest } = cards
  const { THEME } = useThemeColors()

  return (
    <Flex
      {...rest}
      flexBasis={16}
      flexShrink={1}
      flexGrow={1}
      align={'center'}
      justify={'center'}
      bg={THEME.HOME.BACKGROUND}
      borderColor={'violet.500'}
      borderWidth={2}
      borderStyle={'solid'}
      borderRadius={3}
      p={1}
      rounded={'md'}
      boxShadow={'lg'}
      textAlign={'center'}
      cursor={'pointer'}
      transition={'transform .3s ease-in'}
      _hover={{
        transform: 'translateY(-2px)',
      }}
    >
      <Text
        as={'span'}
        color={'violet.500'}
        fontFamily={'Poppins'}
        fontSize={'xl'}
      >
        {name}
      </Text>
    </Flex>
  )
}
