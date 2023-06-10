import { memo } from 'react'
import {
  FormControl,
  GridItem,
  InputProps,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import { FormLabelTitle } from '../../../../components/Form/FormLabelTitle'
import { InputBar } from '../../../../components/Form/InputBar'
import { useThemeColors } from '../../../../hooks/useThemeColors'

function FormCategoryHeroUpdate({ ...rest }: InputProps) {
  const { THEME } = useThemeColors()

  return (
    <form>
      <Stack
        bg={THEME.DASHBOARD.POPOVER_BACKGROUND}
        spacing={6}
        px={4}
        py={5}
        p={[null, 6]}
      >
        <SimpleGrid columns={12} spacing={6}>
          <FormControl as={GridItem} colSpan={12} isRequired>
            <FormLabelTitle title="Nome do Categoria" htmlFor="name_category" />

            <InputBar
              {...rest}
              type="text"
              name="name_category"
              id="name_category"
              autoComplete="name_category"
              placeholder="Digite o nome do categoria"
            />
          </FormControl>
        </SimpleGrid>
      </Stack>
    </form>
  )
}

export default memo(FormCategoryHeroUpdate)
