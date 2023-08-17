import { memo } from 'react'
import { Box, GridItem, SimpleGrid } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { FormUpdateProfile, FormProfileHead } from './index'

const FormProfileHero = () => {
  const { THEME } = useThemeColors()

  return (
    <Box
      bg={THEME.DASHBOARD.TABLE_BACKGROUND}
      shadow={'lg'}
      rounded={'md'}
      p={10}
    >
      <SimpleGrid
        display={{ base: 'initial', md: 'grid' }}
        columns={{ md: 3 }}
        spacing={{ md: 6 }}
        as={'section'}
      >
        <GridItem as={'aside'} colSpan={{ md: 1 }}>
          <FormProfileHead
            title=" Atualizar Usuário"
            description="Preencha as informações para atualizar seu cadastro"
          />
        </GridItem>
        <GridItem as={'section'} mt={[5, null, 0]} colSpan={{ md: 2 }}>
          <FormUpdateProfile />
        </GridItem>
      </SimpleGrid>
    </Box>
  )
}

export default memo(FormProfileHero)
