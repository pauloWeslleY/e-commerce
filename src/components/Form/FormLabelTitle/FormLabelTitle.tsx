import { memo } from 'react'
import { FormLabel, FormLabelProps } from '@chakra-ui/react'
import { useThemeColors } from '../../../hooks/useThemeColors'

interface FormLabelTitleProps extends FormLabelProps {
  title: string
  htmlFor?: string
}

function FormLabelTitle(props: FormLabelTitleProps) {
  const { THEME } = useThemeColors()
  const { title, htmlFor, ...rest } = props

  return (
    <FormLabel
      {...rest}
      htmlFor={htmlFor}
      fontSize={'sm'}
      fontWeight={'semibold'}
      fontFamily={'Poppins'}
      color={THEME.DASHBOARD.FORM_LABEL_BACKGROUND}
    >
      {title}
    </FormLabel>
  )
}

export default memo(FormLabelTitle)
