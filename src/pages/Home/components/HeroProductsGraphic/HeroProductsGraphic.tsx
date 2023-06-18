import { memo } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { ProductGraphicBarChart } from './index'

const HeroProductsGraphic = () => {
  const { THEME } = useThemeColors()

  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        lg: 'repeat(12, 1fr)',
      }}
      gap={9}
      my={4}
    >
      <GridItem
        colSpan={12}
        w={'full'}
        h={'lg'}
        bg={THEME.HOME.BACKGROUND}
        rounded={'md'}
        boxShadow={'lg'}
        p={4}
      >
        <ProductGraphicBarChart />
      </GridItem>
    </Grid>
  )
}

export default memo(HeroProductsGraphic)
