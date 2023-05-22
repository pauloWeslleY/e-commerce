import { ReactNode, memo } from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

interface HeroCategoryContainerProps extends FlexProps {
  children: ReactNode
}

function HeroCategoryContainer(props: HeroCategoryContainerProps) {
  const { children, ...rest } = props

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
      mb={2}
    >
      {children}
    </Flex>
  )
}

export default memo(HeroCategoryContainer)
