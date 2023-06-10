import { SideBar } from '../../components/SideBar'
import { CreateProduct } from './components/CreateProduct'
import { TableHero } from './components/Table'

export const Product = () => {
  return (
    <SideBar>
      <CreateProduct />

      <TableHero/>
    </SideBar>
  )
}
