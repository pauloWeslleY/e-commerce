import { ReactNode, memo } from 'react'
import { ButtonGroup, Flex } from '@chakra-ui/react'

const HeroTableRowButtons = ({ children }: { children: ReactNode }) => (
  <Flex justify={{ md: 'flex-end' }} gap={3}>
    <ButtonGroup size={'sm'} spacing={3}>
      {children}
    </ButtonGroup>
  </Flex>
)

export default memo(HeroTableRowButtons)
