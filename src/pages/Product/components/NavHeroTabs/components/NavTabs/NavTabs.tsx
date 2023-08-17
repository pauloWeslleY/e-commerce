import { memo } from 'react'
import { TabList, Tab, Flex } from '@chakra-ui/react'

interface NavTabsProps {
  navTabsList: {
    title: string
  }[]
}

const NavTabs = ({ navTabsList }: NavTabsProps) => {
  return (
    <Flex align={'center'} justify={'center'}>
      <TabList>
        {navTabsList.map(props => (
          <Tab key={`tabs${props.title}`} color={'violet.500'}>
            {props.title}
          </Tab>
        ))}
      </TabList>
    </Flex>
  )
}

export default memo(NavTabs)
