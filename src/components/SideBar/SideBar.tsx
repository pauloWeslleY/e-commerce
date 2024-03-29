import { ReactNode, memo, useCallback, useState } from 'react'
import { Flex, HStack } from '@chakra-ui/react'
import { useThemeColors } from '../../hooks/useThemeColors'
import { SideBarContainer, SideBarMobile } from './index'
import { SideBarMenuHero } from './SideBarMenuHero'
import { BtnCollapse, ButtonDarkMode } from '../Buttons'

interface SideBarProps {
  children?: ReactNode
}

const SideBar = ({ children }: SideBarProps) => {
  const [collapse, setCollapse] = useState<boolean>(true)
  const { THEME } = useThemeColors()

  const onHandleToggle = useCallback(() => {
    setCollapse(!collapse)
  }, [collapse])

  return (
    <HStack w={'full'} h={'100vh'} bg={THEME.DASHBOARD.BACKGROUND} p={2}>
      <Flex
        as={'aside'}
        display={{ base: 'none', lg: 'flex' }}
        flexDir={'column'}
        align={'center'}
        justify={'space-between'}
        borderRadius={'3xl'}
        bg={THEME.DASHBOARD.SIDE_BAR_BG}
        maxW={collapse ? 300 : 100}
        transition={'all ease-in-out .2s'}
        w={'full'}
        h={'full'}
        p={6}
      >
        <SideBarContainer collapsed={collapse} onItemClick={onHandleToggle} />
      </Flex>
      <Flex
        as={'main'}
        w={'full'}
        h={'full'}
        flexDir={'column'}
        overflowY={'scroll'}
        p={3}
      >
        <Flex as={'nav'} justify={'space-between'} align={'center'} p={1}>
          <Flex gap={2}>
            <SideBarMobile collapsed={collapse} />

            <BtnCollapse
              aria-label="Menu Collapse"
              onHandleToggle={onHandleToggle}
            />

            <ButtonDarkMode />
          </Flex>

          <Flex gap={8} align={'center'}>
            <SideBarMenuHero />
          </Flex>
        </Flex>

        {children}
      </Flex>
    </HStack>
  )
}

export default memo(SideBar)
