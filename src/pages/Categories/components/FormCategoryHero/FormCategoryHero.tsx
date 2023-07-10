import { FormEvent, memo, useEffect } from 'react'
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
import { useCategories } from '../../hooks/useCategories'

interface FormCategoryHeroProps extends InputProps {
  onHandleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
  onHandleClick: () => void
}

function FormCategoryHero(props: FormCategoryHeroProps) {
  const { onHandleClick, onHandleSubmit, ...rest } = props
  const { name, isValid, isFormValid } = useCategories()

  useEffect(() => {
    isFormValid()
  }, [name])

  return (
    <Box mt={[10, 0]}>
      <chakra.form
        onSubmit={onHandleSubmit}
        rounded={[null, 'md']}
        overflow={{ sm: 'hidden' }}
      >
        <Stack px={4} py={5} p={[null, 6]} spacing={6}>
          <SimpleGrid columns={12} spacing={6}>
            <FormControl isRequired as={GridItem} colSpan={[1, 12]}>
              <FormLabelTitle
                title="Nome da Categoria"
                htmlFor="name_category"
              />

              <InputBar
                {...rest}
                value={name}
                type="text"
                name="name_category"
                id="name_category"
                autoComplete="name_category"
                placeholder="Digite o nome do categoria"
                px={1}
              />
            </FormControl>
          </SimpleGrid>
        </Stack>
        <Box px={{ base: 4, sm: 6 }} py={3} textAlign={'right'}>
          <IsButton
            title="Criar"
            type="submit"
            onClick={onHandleClick}
            isDisabled={!isValid}
          />
        </Box>
      </chakra.form>
    </Box>
  )
}

export default memo(FormCategoryHero)
