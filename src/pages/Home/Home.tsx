import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { BiCategory, BiHomeAlt2, BiUser } from 'react-icons/bi'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useFetch } from '../../hooks/useFetch'
import { CardsHomeType } from '../../types/CardsHomeType'
import { CardStatistic } from './components/CardStatistic'
import { HeroGraphics } from './components/HeroGraphics'
import { HeroTitleBar } from '../../components/HeroTitle'
import { GraphicsProducts } from './components/GraphicsProducts'

export function Home() {
  const { isCategories, users, product } = useFetch()
  const { THEME } = useThemeColors()

  const CARDS_HOME_PROPS: Array<CardsHomeType> = [
    {
      icon: HiOutlineShoppingBag,
      title: 'Produtos',
      subtitle: product.length,
      background: THEME.HOME.CARDS_STATISTIC_BG_PROD,
    },
    {
      icon: BiCategory,
      title: 'Categorias',
      subtitle: isCategories.length,
      background: THEME.HOME.CARDS_STATISTIC_BG_CATE,
    },
    {
      icon: BiUser,
      title: 'Usuários',
      subtitle: users.length,
      background: THEME.HOME.CARDS_STATISTIC_BG_USERS,
    },
  ]

  return (
    <>
      <HeroTitleBar label="Home" icon={BiHomeAlt2} />

      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          lg: 'repeat(12, 1fr)',
        }}
        gap={9}
        my={4}
        as={'section'}
      >
        {CARDS_HOME_PROPS.map((props, index) => (
          <GridItem key={`${props.icon}${index}`} colSpan={{ lg: 4 }}>
            <Flex>
              <CardStatistic cards={props} />
            </Flex>
          </GridItem>
        ))}
      </Grid>

      <GraphicsProducts />

      <HeroGraphics />
    </>
  )
}
