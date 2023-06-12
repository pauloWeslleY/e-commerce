import { MdOutlineNotificationsActive } from 'react-icons/md'
import { BiCategory, BiHomeAlt2, BiUser } from 'react-icons/bi'
import { TbTool } from 'react-icons/tb'
import { HiOutlineChatBubbleBottomCenter } from 'react-icons/hi2'
import { BsGear } from 'react-icons/bs'
import { HiOutlineMail, HiOutlineShoppingBag } from 'react-icons/hi'
import { VscGraphLeft } from 'react-icons/vsc'
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
    label: 'Notificações',
    icon: MdOutlineNotificationsActive,
    path: '/',
    notifications: 18,
  },
  {
    type: 'link',
    label: 'Chat',
    icon: HiOutlineChatBubbleBottomCenter,
    path: '/',
    messages: 5,
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
