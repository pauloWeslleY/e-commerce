import { memo } from 'react'
import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { FilterByCategory } from '../FilterByCategory'

function HeroProducts() {
  const { THEME } = useThemeColors()

  return (
    <Flex as={'section'} flexDir={'column'}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          lg: 'repeat(12, 1fr)',
        }}
        gap={2}
      >
        <GridItem
          colSpan={{ lg: 12 }}
          bg={THEME.HOME.BACKGROUND}
          rounded={'md'}
          boxShadow={'lg'}
        >
          <Flex flexDir={'column'} p={2}>
            <FilterByCategory />
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  )
}

export default memo(HeroProducts)
