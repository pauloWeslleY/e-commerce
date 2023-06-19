import { AiOutlineUser } from 'react-icons/ai'
import { SideBar } from '../../components/SideBar'
import { HeroTitleBar } from '../../components/HeroTitle'
import { UsersTable } from './components/UsersTable'

export const Users = () => {
  return (
    <SideBar>
      <HeroTitleBar label="Usuários" icon={AiOutlineUser} />

      <UsersTable />
    </SideBar>
  )
}
