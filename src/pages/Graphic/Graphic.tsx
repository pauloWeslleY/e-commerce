import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { VscGraphLeft } from 'react-icons/vsc'

import { SideBar } from '../../components/SideBar'
import { HeroTitleBar } from '../../components/HeroTitle'
import { ProductsGraphic } from './components/ProductsGraphic'
import { useThemeColors } from '../../hooks/useThemeColors'
import { HeroProductsGraphic } from './components/HeroProductsGraphic'
import { TitleHeroGraphic } from './components/TitleHeroGraphic'

export const Graphic = () => {
  const { THEME } = useThemeColors()

  return (
    <SideBar>
      <HeroTitleBar label={'Gráficos de Desempenho'} icon={VscGraphLeft} />

      <main>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            lg: 'repeat(12, 1fr)',
          }}
          my={5}
        >
          <GridItem
            colSpan={{ lg: 12 }}
            bg={THEME.HOME.BACKGROUND}
            rounded={'lg'}
            shadow={'md'}
          >
            <TitleHeroGraphic title="Produtos Mais Vendidos" />

            <Flex w={'full'} h={'2xl'}>
              <ProductsGraphic />
            </Flex>
          </GridItem>
        </Grid>
      </main>

      <section>
        <HeroProductsGraphic />
      </section>
    </SideBar>
  )
}
