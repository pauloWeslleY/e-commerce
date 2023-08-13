import { HiOutlineShoppingBag } from 'react-icons/hi'
import { NavBar } from '../../components/NavBar'
import { SideBar } from '../../components/SideBar'
import { CreateProductHero } from './components/CreateProductHero'
import { ProductsProvider } from './provider/providerProducts'
import { NavHeroTabs } from './components/NavHeroTabs'
import { FormCreateProduct } from './components/FormCreateProduct'

export const Product = () => {
  return (
    <ProductsProvider>
      <SideBar>
        <NavBar
          label="Tabela de Produtos"
          title="Criar Produto"
          icon={HiOutlineShoppingBag}
          isButton={false}
        />

        <NavHeroTabs form={<FormCreateProduct />}>
          <CreateProductHero />
        </NavHeroTabs>
      </SideBar>
    </ProductsProvider>
  )
}
