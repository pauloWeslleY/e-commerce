import { memo, useState } from 'react'
import {
  Button,
  FormControl,
  Input,
  InputProps,
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { HiLockClosed } from 'react-icons/hi'
import { FormLabelTitle } from '../FormLabelTitle'
import { useThemeColors } from '../../../hooks/useThemeColors'

const InputPassword = ({ ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { THEME } = useThemeColors()

  return (
    <FormControl id="password">
      <FormLabelTitle title="Senha" htmlFor="password" />
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<HiLockClosed color="gray.300" />}
        />
        <Input
          {...props}
          id="password"
          name="password"
          autoComplete="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Digite sua senha..."
          focusBorderColor={'purple.300'}
          fontFamily={'Poppins'}
          _placeholder={{
            opacity: 1,
            color: THEME.DASHBOARD.INPUT_BAR_PLACEHOLDER_COLORS,
          }}
          shadow={'sm'}
          w={'full'}
          variant={'flushed'}
          bg={'transparent'}
        />
        <InputRightElement h={'full'}>
          <Button
            variant={'ghost'}
            onClick={() => setShowPassword(showPassword => !showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  )
}

export default memo(InputPassword)
