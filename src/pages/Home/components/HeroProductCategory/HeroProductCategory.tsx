import { memo } from 'react'
import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { ProductsGraphicPieChart } from '../ProductsGraphicPieChart'
import { FilterByCategory } from '../FilterByCategory'

const HeroProductCategory = () => {
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
        colSpan={{ lg: 6 }}
        bg={THEME.HOME.BACKGROUND}
        rounded={'md'}
        boxShadow={'lg'}
        p={3}
        w={'full'}
      >
        <Flex flexDir={'column'} gap={4}>
          <Text as={'h3'} px={5} py={4} fontSize={'xl'}>
            Categorias Cadastra
          </Text>

          <FilterByCategory />
        </Flex>
      </GridItem>

      <GridItem
        colSpan={{ lg: 6 }}
        bg={THEME.HOME.BACKGROUND}
        rounded={'md'}
        boxShadow={'lg'}
        py={6}
      >
        <Flex w={'full'} h={'45vh'} flexDir={'column'}>
          <Text as={'h3'} px={5} fontSize={'xl'}>
            Gráficos de Produtos
          </Text>

          <ProductsGraphicPieChart />
        </Flex>
        <Flex as={'ul'} px={10} flexDir={'column'}>
          <Text as={'li'} color={'emerald.400'}>
            Produtos
          </Text>
          <Text as={'li'} color={'purple.600'}>
            Categorias
          </Text>
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default memo(HeroProductCategory)
