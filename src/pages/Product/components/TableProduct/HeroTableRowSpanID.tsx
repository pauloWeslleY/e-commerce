import { ReactNode, memo } from 'react'
import { chakra } from '@chakra-ui/react'

const HeroTableRowSpanID = ({ children }: { children: ReactNode }) => (
  <chakra.span
    textOverflow="ellipsis"
    overflow="hidden"
    whiteSpace="nowrap"
    textTransform={'uppercase'}
    w={'7rem'}
  >
    {children}
  </chakra.span>
)

export default memo(HeroTableRowSpanID)
