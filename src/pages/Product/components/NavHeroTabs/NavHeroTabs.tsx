import { ReactElement, ReactNode, memo } from 'react'
import { Tabs, TabPanels, TabPanel } from '@chakra-ui/react'
import { NavTabs } from './components/NavTabs'

interface NavTabsProps {
  title: string
}

interface NavHeroTabsProps {
  children: ReactNode
  form: ReactElement
}

const NavHeroTabs = ({ children, form }: NavHeroTabsProps) => {
  const NAV_TABS: Array<NavTabsProps> = [
    { title: 'Tabela de Produtos' },
    { title: 'Criar Produto' },
  ]

  return (
    <Tabs variant={'soft-rounded'} colorScheme={'purple'} mt={6}>
      <NavTabs navTabsList={NAV_TABS} />

      <TabPanels>
        <TabPanel>{children}</TabPanel>
        <TabPanel>{form}</TabPanel>
      </TabPanels>
    </Tabs>
  )
}
export default memo(NavHeroTabs)
