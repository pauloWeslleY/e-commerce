import { Stack, chakra } from '@chakra-ui/react'
import { ReactNode, memo } from 'react'
import { useThemeColors } from '../../../hooks/useThemeColors'

interface FormContainerProps {
  children: ReactNode
  onHandleSubmit: React.FormEventHandler<HTMLFormElement>
}

const FormContainer = ({ children, onHandleSubmit }: FormContainerProps) => {
  const { THEME } = useThemeColors()

  return (
    <Stack
      as={'section'}
      bg={THEME.SIGN_IN.BACKGROUND}
      rounded={'lg'}
      boxShadow={'lg'}
      p={10}
    >
      <chakra.form onSubmit={onHandleSubmit}>
        <Stack spacing={4} w={['full', 'lg']} align={'center'}>
          {children}
        </Stack>
      </chakra.form>
    </Stack>
  )
}

export default memo(FormContainer)
