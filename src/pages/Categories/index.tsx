import { SideBar } from '../../components/SideBar'
import { CreateCategories } from './components/CreateCategories'
import { CategoriesProvider } from './provider/ categoriesProvider'

export const Categories = () => {
  return (
    <CategoriesProvider>
      <SideBar>
        <CreateCategories />
      </SideBar>
    </CategoriesProvider>
  )
}
