import { TbTool } from 'react-icons/tb'
import { SideBar } from '../../components/SideBar'
import { HeroTitleBar } from '../../components/HeroTitle'
import { FormProfileHero } from './components/FormProfileHero'

export function UserProfile() {
  return (
    <SideBar>
      <HeroTitleBar label="Profile" icon={TbTool} />

      <section>
        <FormProfileHero />
      </section>
    </SideBar>
  )
}
