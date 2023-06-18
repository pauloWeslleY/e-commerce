import { TbTool } from 'react-icons/tb'
import { BsGear } from 'react-icons/bs'
import { VscGraphLeft } from 'react-icons/vsc'
import { BiCategory, BiHomeAlt2, BiUser } from 'react-icons/bi'
import { HiOutlineMail, HiOutlineShoppingBag } from 'react-icons/hi'
import { MenuItemsProps } from '../../../../types/MenuItemsProps'

const MENU_ITEMS: Array<MenuItemsProps> = [
  {
    type: 'header',
    label: 'Menu',
  },
  {
    type: 'link',
    label: 'Home',
    icon: BiHomeAlt2,
    path: '/dashboard',
  },
  {
    type: 'link',
    label: 'Produtos',
    icon: HiOutlineShoppingBag,
    path: '/dashboard/product',
  },

  {
    type: 'link',
    label: 'Categorias',
    icon: BiCategory,
    path: '/dashboard/categories',
  },
  {
    type: 'link',
    label: 'Desempenho',
    icon: VscGraphLeft,
    path: '/dashboard/graphics',
  },
  {
    type: 'link',
    label: 'Email',
    icon: HiOutlineMail,
    path: '/',
  },
  {
    type: 'link',
    label: 'Usuários',
    icon: BiUser,
    path: '/dashboard/users',
  },
  {
    type: 'header',
    label: 'Account',
  },
  {
    type: 'link',
    label: 'Profile',
    icon: TbTool,
    path: '/dashboard/profile',
  },
  {
    type: 'link',
    label: 'Configurações',
    icon: BsGear,
    path: '/',
  },
]

export { MENU_ITEMS }
