import { memo } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { HeroUserGraphic, HeroUsers } from '../HeroUsers'

const HeroGraphics = () => {
  const { THEME } = useThemeColors()

  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        lg: 'repeat(12, 1fr)',
      }}
      gap={9}
      my={4}
      as={'section'}
    >
      <GridItem
        colSpan={{ lg: 3 }}
        bg={THEME.HOME.BACKGROUND}
        rounded={'md'}
        boxShadow={'lg'}
      >
        <HeroUsers />
      </GridItem>

      <GridItem
        colSpan={{ lg: 9 }}
        bg={THEME.HOME.BACKGROUND}
        rounded={'md'}
        boxShadow={'lg'}
        p={4}
      >
        <HeroUserGraphic />
      </GridItem>
    </Grid>
  )
}

export default memo(HeroGraphics)
