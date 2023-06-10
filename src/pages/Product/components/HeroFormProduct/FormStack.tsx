import { ReactNode, memo } from 'react'
import { Stack, StackProps } from '@chakra-ui/react'

interface FormStackProps extends StackProps {
  bg: string
  children: ReactNode
}

function FormStack(props: FormStackProps) {
  const { children, bg, ...rest } = props

  return (
    <Stack {...rest} bg={bg} spacing={6} px={4} py={5} p={[null, 6]}>
      {children}
    </Stack>
  )
}

export default memo(FormStack)
