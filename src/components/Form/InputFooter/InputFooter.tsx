import { memo } from 'react'
import { Box, Stack, Text } from '@chakra-ui/react'

interface InputFooterProps {
  label: string
  link: string
  onClick: () => void
}

const InputFooter = ({ label, link, onClick }: InputFooterProps) => (
  <Stack pt={6} align={'center'}>
    <Text fontWeight={500}>
      {label}{' '}
      <Box
        as={'a'}
        onClick={onClick}
        cursor={'pointer'}
        color={'violet.300'}
        transition={'color .5s ease-out 100ms'}
        _hover={{
          color: 'violet.600',
        }}
      >
        {link}
      </Box>
    </Text>
  </Stack>
)

export default memo(InputFooter)
