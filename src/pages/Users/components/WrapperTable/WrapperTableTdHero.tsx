import { memo } from 'react'
import { Td } from '@chakra-ui/react'

const WrapperTableTdHero = ({ label }: { label: string }) => (
  <Td color={'purple.700'} fontSize={'md'} fontWeight={'medium'}>
    {label}
  </Td>
)

export default memo(WrapperTableTdHero)
