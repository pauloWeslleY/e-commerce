import { memo } from 'react'
import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { useColors } from '../../../../hooks/useColors'
import { FilterByCategory } from '../FilterByCategory'

function HeroProducts() {
  const { THEME } = useColors()

  return (
    <Flex as={'section'} flexDir={'column'}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          lg: 'repeat(12, 1fr)',
        }}
        gap={2}
        as={'section'}
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
