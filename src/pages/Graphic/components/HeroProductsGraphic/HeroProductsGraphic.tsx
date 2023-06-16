import { memo } from 'react'
import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { GraphicByProductQuantity } from '../GraphicsBox'
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
      <GridItem colSpan={{ lg: 8 }} w={'full'}>
        <TitleHeroGraphic title="Produtos" bg={THEME.HOME.BACKGROUND} />

        <Flex
          bg={THEME.HOME.BACKGROUND}
          rounded={'lg'}
          shadow={'md'}
          w={'full'}
          h={'sm'}
        >
          <GraphicByProductQuantity />
        </Flex>
      </GridItem>
      <GridItem colSpan={{ lg: 4 }} h={'2xl'} w={'full'}>
        <TitleHeroGraphic title="Categorias" bg={THEME.HOME.BACKGROUND} />

        <Flex
          bg={THEME.HOME.BACKGROUND}
          rounded={'lg'}
          shadow={'md'}
          w={'full'}
          h={'sm'}
        >
          <CategoriesGraphic />
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default memo(HeroProductsGraphic)
