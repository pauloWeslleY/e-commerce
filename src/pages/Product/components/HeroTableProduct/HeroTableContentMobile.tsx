import { memo } from 'react'
import { Td } from '@chakra-ui/react'

const HeroTableContentMobile = ({ title }: { title: string }) => {
  return (
    <Td
      display={{
        base: 'table-cell',
        lg: 'none',
      }}
      sx={{
        '@media print': {
          display: 'none',
        },
        textTransform: 'uppercase',
        color: 'purple.500',
        fontSize: 'xs',
        fontWeight: 'bold',
        letterSpacing: 'wider',
        fontFamily: 'heading',
      }}
    >
      {title}
    </Td>
  )
}

export default memo(HeroTableContentMobile)
