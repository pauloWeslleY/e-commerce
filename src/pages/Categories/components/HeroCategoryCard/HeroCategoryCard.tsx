import { ReactNode, memo } from 'react'
import { Flex, FlexProps, Text } from '@chakra-ui/react'
import { CategoriesProps } from '../../../../types/CategoriesProps'
import { useThemeColors } from '../../../../hooks/useThemeColors'

interface HeroCategoryCardProps extends FlexProps {
  children: ReactNode
  category: CategoriesProps
}

const HeroCategoryCard = (props: HeroCategoryCardProps) => {
  const { category, children, ...rest } = props
  const { THEME } = useThemeColors()

  return (
    <Flex
      {...rest}
      bg={THEME.DASHBOARD.HERO_CATEGORY_CARD_BG}
      align={'center'}
      justify={'space-between'}
      gap={6}
      py={2}
      px={4}
      rounded={'md'}
      shadow={'md'}
      cursor={'pointer'}
      transition={'all 0.3s ease-out'}
      _hover={{
        opacity: '.7',
        transform: 'translateX(5px)',
      }}
    >
      <Flex flexDir={'column'} justify={'space-between'} gap={2}>
        <Text
          as={'h3'}
          fontSize={'md'}
          fontWeight={'semibold'}
          color={'violet.600'}
        >
          {category.name}
        </Text>
        <Text fontSize={'sm'} fontWeight={'medium'} letterSpacing={'wider'}>
          Produtos cadastrado - {category.products.length}
        </Text>
      </Flex>
      {children}
    </Flex>
  )
}

export default memo(HeroCategoryCard)
