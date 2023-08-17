import { useEffect, useState } from 'react'
import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { VscGraphLeft } from 'react-icons/vsc'
import { SideBar } from '../../components/SideBar'
import { HeroTitleBar } from '../../components/HeroTitle'
import { ProductsGraphic } from './components/ProductsGraphic'
import { useThemeColors } from '../../hooks/useThemeColors'
import { HeroProductsGraphic } from './components/HeroProductsGraphic'
import { query, onSnapshot, where } from 'firebase/firestore'
import { prodCollectionRef } from '../../services/collections'
import { ProductsType } from '../../types/ProductType'

export const Graphic = () => {
  const [products, setProducts] = useState<ProductsType[]>([])
  const { THEME } = useThemeColors()

  useEffect(() => {
    const querySnapshot = query(prodCollectionRef, where('quantity', '>', 200))
    const unsubscribe = onSnapshot(querySnapshot, snapshot => {
      const productsData: ProductsType[] = []

      snapshot.forEach(doc => {
        const product = { id: doc.id, ...doc.data() }
        productsData.push(product)
      })

      setProducts(productsData)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <SideBar>
      <HeroTitleBar label="Nível de estoque" icon={VscGraphLeft} />

      <main>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            lg: 'repeat(12, 1fr)',
          }}
          my={5}
        >
          <GridItem colSpan={{ lg: 12 }}>
            <Flex
              bg={THEME.HOME.BACKGROUND}
              rounded={'lg'}
              shadow={'md'}
              w={'full'}
              h={'2xl'}
              p={2}
            >
              <ProductsGraphic products={products} />
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
