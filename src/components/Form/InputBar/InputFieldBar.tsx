import { HTMLInputTypeAttribute, ReactElement, memo } from 'react'
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

  return (
    <FormControl id={label} isRequired>
      <FormLabelTitle title={title} htmlFor={label} />
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={icon} />
        <Input
          {...rest}
          id={label}
          type={inputType}
          name={label}
          autoComplete={label}
          focusBorderColor={'purple.300'}
          _placeholder={{
            opacity: 1,
            color: THEME.DASHBOARD.INPUT_BAR_PLACEHOLDER_COLORS,
          }}
          fontFamily={'Poppins'}
          shadow={'sm'}
          variant={'flushed'}
          bg={'transparent'}
        />
      </InputGroup>
    </FormControl>
  )
}

export default memo(InputFieldBar)
