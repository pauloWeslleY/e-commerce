import { ReactNode, memo } from 'react'
import { Flex, FlexProps, Text } from '@chakra-ui/react'
import { CategoryType } from '../../../../types/CategoryType'

interface HeroCategoryContainerProps extends FlexProps {
  children: ReactNode
  category: CategoryType
}

const HeroCategoryContainer = (props: HeroCategoryContainerProps) => {
  const { category, children, ...rest } = props

  return (
    <Flex
      {...rest}
      align={'center'}
      justify={'space-between'}
      gap={6}
      py={2}
      px={4}
      rounded={'md'}
      shadow={'md'}
      bg={'whiteAlpha.100'}
      cursor={'pointer'}
      transition={'all 0.3s ease-out'}
      _hover={{
        opacity: '.7',
        transform: 'translateX(5px)',
      }}
    >
      <Text
        as={'h3'}
        fontFamily={'Poppins'}
        fontSize={'md'}
        fontWeight={'medium'}
      >
        {category.name}
      </Text>
      {children}
    </Flex>
  )
}

export default memo(HeroCategoryContainer)
