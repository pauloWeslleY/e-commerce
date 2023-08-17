import { FormEvent, ReactNode, memo } from 'react'
import { Box, chakra } from '@chakra-ui/react'

interface FormHeroBoxProps {
  children: ReactNode
  onHandleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
}

const FormHeroBox = ({ children, onHandleSubmit }: FormHeroBoxProps) => {
  return (
    <Box mt={[10, 0]} mb={8}>
      <chakra.form
        onSubmit={onHandleSubmit}
        shadow={'md'}
        rounded={[null, 'md']}
        overflow={{ sm: 'hidden' }}
      >
        {children}
      </chakra.form>
    </Box>
  )
}

export default memo(FormHeroBox)
