import { HTMLInputTypeAttribute, ReactElement, memo, useRef } from 'react'
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from '@chakra-ui/react'
import { FormLabelTitle } from '../FormLabelTitle'
import { useThemeColors } from '../../../hooks/useThemeColors'

interface InputFieldBarProps extends InputProps {
  label: string
  title: string
  inputType: HTMLInputTypeAttribute
  icon?: ReactElement
}

const InputFieldBar = (props: InputFieldBarProps) => {
  const { title, label, inputType, icon, ...rest } = props
  const { THEME } = useThemeColors()
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <FormControl id={label}>
      <FormLabelTitle title={title} htmlFor={label} />
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={icon} />
        <Input
          {...rest}
          id={label}
          type={inputType}
          name={label}
          autoComplete={label}
          ref={inputRef}
          fontFamily={'Poppins'}
          shadow={'sm'}
          variant={'flushed'}
          bg={'transparent'}
          focusBorderColor={'purple.300'}
          _placeholder={{
            opacity: 1,
            color: THEME.DASHBOARD.INPUT_BAR_PLACEHOLDER_COLORS,
          }}
        />
      </InputGroup>
    </FormControl>
  )
}

export default memo(InputFieldBar)
