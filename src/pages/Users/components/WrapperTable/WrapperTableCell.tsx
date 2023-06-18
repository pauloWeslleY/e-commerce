import { memo } from 'react'
import { Td } from '@chakra-ui/react'

const WrapperTableCell = ({ title }: { title: string }) => (
  <Td
    display={{
      base: 'table-cell',
      md: 'none',
    }}
    sx={{
      '@media print': {
        display: 'none',
      },
      textTransform: 'uppercase',
      color: 'gray.400',
      fontSize: 'xs',
      fontWeight: 'bold',
      fontFamily: 'Poppins',
      letterSpacing: 'wider',
    }}
  >
    {title}
  </Td>
)

export default memo(WrapperTableCell)
