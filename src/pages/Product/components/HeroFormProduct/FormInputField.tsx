import { HTMLInputTypeAttribute, memo } from 'react'
import { FormControl, GridItem, Input, InputProps } from '@chakra-ui/react'
import { FormLabelTitle } from '../../../../components/Form/FormLabelTitle'
import { useThemeColors } from '../../../../hooks/useThemeColors'

interface FormInputFieldProps extends InputProps {
  title: string
  label: string
  colSpan: any
  type: HTMLInputTypeAttribute
}

const FormInputField = (props: FormInputFieldProps) => {
  const { title, label, type, colSpan, ...rest } = props
  const { THEME } = useThemeColors()

  return (
    <FormControl isRequired as={GridItem} colSpan={colSpan}>
      <FormLabelTitle title={title} htmlFor={label} />

      <Input
        {...rest}
        id={label}
        type={type}
        name={label}
        autoComplete={label}
        mt={1}
        variant={'flushed'}
        letterSpacing={'wider'}
        shadow={'sm'}
        size={'sm'}
        w={'full'}
        bg={'transparent'}
        focusBorderColor={THEME.DASHBOARD.INPUT_BAR_PLACEHOLDER_FOCUS_COLORS}
        _placeholder={{
          opacity: 1,
          color: THEME.DASHBOARD.INPUT_BAR_PLACEHOLDER_COLORS,
        }}
      />
    </FormControl>
  )
}

export default memo(FormInputField)
