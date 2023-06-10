import { ReactNode, memo } from 'react'
import { Td } from '@chakra-ui/react'

const WrapperTableTdHero = ({ children }: { children: ReactNode }) => (
  <Td color={'purple.700'} fontSize={'md'} fontWeight={500}>
    {children}
  </Td>
)

export default memo(WrapperTableTdHero)
