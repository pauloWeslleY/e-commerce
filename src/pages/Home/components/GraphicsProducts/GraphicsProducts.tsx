import { memo } from 'react'
import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { GraphicPieChart, GraphicsCategory } from '../GraphicPieChart'

const GraphicsProducts = () => {
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
        colSpan={{ lg: 8 }}
        bg={THEME.HOME.BACKGROUND}
        rounded={'md'}
        boxShadow={'lg'}
        p={3}
        w={'full'}
        h={'57vh'}
      >
        <GraphicsCategory />
      </GridItem>

      <GridItem
        colSpan={{ lg: 4 }}
        bg={THEME.HOME.BACKGROUND}
        rounded={'md'}
        boxShadow={'lg'}
        py={6}
      >
        <Flex w={'full'} h={'45vh'} flexDir={'column'}>
          <Text as={'h3'} px={5} fontFamily={'Poppins'} fontSize={'xl'}>
            Gráficos de Produtos
          </Text>

          <GraphicPieChart />
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

export default memo(GraphicsProducts)
