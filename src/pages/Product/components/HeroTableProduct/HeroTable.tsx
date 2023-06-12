import { ReactNode, memo } from 'react'
import { Table } from '@chakra-ui/react'
import { HeroTableBody, HeroTableHead } from './index'

const HeroTable = ({ bg, children }: { bg: string; children: ReactNode }) => (
  <Table
    my={4}
    w={'full'}
    bg={bg}
    display={{ base: 'block', md: 'table' }}
    rounded={'lg'}
    shadow={'lg'}
  >
    <HeroTableHead />
    <HeroTableBody>{children}</HeroTableBody>
  </Table>
)

export default memo(HeroTable)
