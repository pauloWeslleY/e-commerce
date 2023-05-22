import { TbTool } from 'react-icons/tb'
import { SideBar } from '../../components/SideBar'
import { HeroTitleBar } from '../../components/HeroTitle'
import FormLayout from '../../components/FormLayout'

export function UserProfile() {
  return (
    <SideBar>
      <HeroTitleBar label={'Profile'} icon={TbTool} />

      <FormLayout />
    </SideBar>
  )
}
