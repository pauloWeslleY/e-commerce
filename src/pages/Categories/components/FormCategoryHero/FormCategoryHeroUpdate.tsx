import { memo, useEffect } from 'react'
import {
  Stack,
  FormControl,
  InputProps,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react'
import { FormLabelTitle } from '../../../../components/Form/FormLabelTitle'
import { InputBar } from '../../../../components/Form/InputBar'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { useCategories } from '../../hooks/useCategories'

function FormCategoryHeroUpdate({ ...rest }: InputProps) {
  const { THEME } = useThemeColors()
  const { name, isFormValid } = useCategories()

  useEffect(() => {
    isFormValid()
  }, [name])

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
