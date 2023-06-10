import { ReactNode, memo } from 'react'
import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { useColors } from '../../../../hooks/useColors'

function WrapperTable({ children }: { children: ReactNode }) {
  const { THEME } = useColors()
  const HEADER: Array<string> = ['ID', 'Nome', 'Email', 'ações']

  return (
    <Table
      w={'full'}
      my={5}
      bg={THEME.TABLE_USERS.TABLE_BACKGROUND}
      display={{
        base: 'block',
        md: 'table',
      }}
      sx={{
        '@media print': {
          display: 'table',
        },
      }}
    >
      <Thead
        display={{
          base: 'none',
          md: 'table-header-group',
        }}
        sx={{
          '@media print': {
            display: 'table-header-group',
          },
        }}
      >
        <Tr>
          {HEADER.map((props) => (
            <Th key={props} color={THEME.TABLE_USERS.TABLE_TITLE_COLORS}>
              {props}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody
        display={{
          base: 'block',
          lg: 'table-row-group',
        }}
        sx={{
          '@media print': {
            display: 'table-row-group',
          },
        }}
      >
        {children}
      </Tbody>
    </Table>
  )
}

export default memo(WrapperTable)
