import { FormEvent, memo } from 'react'
import {
  Box,
  FormControl,
  GridItem,
  InputProps,
  SimpleGrid,
  Stack,
  chakra,
} from '@chakra-ui/react'
import { FormLabelTitle } from '../../../../components/Form/FormLabelTitle'
import { IsButton } from '../../../../components/Buttons'
import { InputBar } from '../../../../components/Form/InputBar'
import { useColors } from '../../../../hooks/useColors'

interface FormCategoryHeroProps extends InputProps {
  onHandleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
  onHandleClick: () => void
}

function FormCategoryHero(props: FormCategoryHeroProps) {
  const { onHandleClick, onHandleSubmit, ...rest } = props
  const { THEME } = useColors()

  return (
    <Box mt={[10, 0]} mb={8}>
      <chakra.form
        onSubmit={onHandleSubmit}
        shadow={'base'}
        rounded={[null, 'md']}
        overflow={{
          sm: 'hidden',
        }}
      >
        <Stack
          px={4}
          py={5}
          p={[null, 6]}
          bg={THEME.DASHBOARD.FORM_BACKGROUND}
          spacing={6}
        >
          <SimpleGrid columns={12} spacing={6}>
            <FormControl isRequired as={GridItem} colSpan={[1, 12]}>
              <FormLabelTitle
                title="Nome da Categoria"
                htmlFor="name_category"
              />

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
        <Box
          px={{
            base: 4,
            sm: 6,
          }}
          py={3}
          bg={THEME.DASHBOARD.FORM_FOOTER_BACKGROUND}
          textAlign={'right'}
        >
          <IsButton title="Adicionar" type="submit" onClick={onHandleClick} />
        </Box>
      </chakra.form>
    </Box>
  )
}

export default memo(FormCategoryHero)
