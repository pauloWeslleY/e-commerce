import { ReactNode, memo } from 'react'
import { chakra } from '@chakra-ui/react'

const HeroTableRowSpan = ({ children }: { children: ReactNode }) => (
  <chakra.span textOverflow="ellipsis" overflow="hidden">
    {children}
  </chakra.span>
)

export default memo(HeroTableRowSpan)
