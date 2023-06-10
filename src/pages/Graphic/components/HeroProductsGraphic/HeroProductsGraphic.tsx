import { memo } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { GraphicsBox } from '../GraphicsBox'
import { CategoriesGraphic } from '../CategoriesGraphic'
import { TitleHeroGraphic } from '../TitleHeroGraphic'

const HeroProductsGraphic = () => {
  const { THEME } = useThemeColors()

  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        lg: 'repeat(12, 1fr)',
      }}
      gap={9}
      my={5}
    >
      <GridItem
        colSpan={{ lg: 6 }}
        bg={THEME.HOME.BACKGROUND}
        rounded={'lg'}
        shadow={'md'}
        h={'2xl'}
        w={'full'}
      >
        <TitleHeroGraphic title="Produtos" />

        <GraphicsBox />
      </GridItem>
      <GridItem
        colSpan={{ lg: 6 }}
        bg={THEME.HOME.BACKGROUND}
        rounded={'lg'}
        shadow={'md'}
        h={'2xl'}
        w={'full'}
      >
        <TitleHeroGraphic title="Categorias" />

        <CategoriesGraphic />
      </GridItem>
    </Grid>
  )
}

export default memo(HeroProductsGraphic)
