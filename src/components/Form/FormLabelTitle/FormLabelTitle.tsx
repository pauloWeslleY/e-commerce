import { memo } from 'react'
import { FormLabel, FormLabelProps } from '@chakra-ui/react'
import { useThemeColors } from '../../../hooks/useThemeColors'

interface FormLabelTitleProps extends FormLabelProps {
  title: string
  htmlFor?: string
}

const FormLabelTitle = (props: FormLabelTitleProps) => {
  const { title, htmlFor, ...rest } = props
  const { THEME } = useThemeColors()

  return (
    <FormLabel
      {...rest}
      htmlFor={htmlFor}
      fontSize={'sm'}
      fontWeight={'semibold'}
      letterSpacing={'wider'}
      color={THEME.DASHBOARD.FORM_LABEL_BACKGROUND}
    >
      {title}
    </FormLabel>
  )
}

export default memo(FormLabelTitle)
