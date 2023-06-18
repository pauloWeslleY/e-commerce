import { memo, useContext } from 'react'
import { Avatar, Button, Flex, Text } from '@chakra-ui/react'
import { AuthenticationContext } from '../../contexts/authContextProvider'
import { useThemeColors } from '../../hooks/useThemeColors'
import { SideBarContainerProps } from '../../types/SideBarType'
import { SideBarAvatarMenu } from './index'
import { HiOutlineLogout } from 'react-icons/hi'
import { IconUser } from '../IconUser'

const SideBarAvatarHero = ({ collapsed }: SideBarContainerProps) => {
  const { userOnAuth, handleLogout } = useContext(AuthenticationContext)
  const { THEME } = useThemeColors()

  return (
    <Flex
      align={'center'}
      justify={'space-between'}
      flexDir={collapsed ? 'row' : 'column-reverse'}
      gap={2}
      w={'full'}
      p={2}
    >
      {!collapsed && (
        <Avatar name={userOnAuth.username} src={userOnAuth.avatar} />
      )}
      {!collapsed && <SideBarAvatarMenu />}

      {collapsed && (
        <Flex
          w={'full'}
          align={'center'}
          justify={'center'}
          flexDir={'column'}
          gap={4}
        >
          {userOnAuth.avatar ? (
            <Avatar
              size={'md'}
              src={userOnAuth.avatar}
              name={userOnAuth.username}
            />
          ) : (
            <Avatar boxSize={12} bg={'purple.600'} icon={IconUser} />
          )}
          <Text
            fontSize={'sm'}
            fontWeight={'semibold'}
            pb={0}
            lineHeight={0}
            color={THEME.DASHBOARD.TEXT_COLORS}
          >
            {userOnAuth.username}
          </Text>
          <Text
            as={'small'}
            color={THEME.DASHBOARD.SIDEBAR_AVATAR_HERO_COLORS}
            fontSize={12}
            fontFamily={'Inter'}
            lineHeight={0}
          >
            {userOnAuth.email}
          </Text>
          <Button
            onClick={handleLogout}
            leftIcon={<HiOutlineLogout />}
            variant={'outline'}
            size={'sm'}
            border={'2px'}
            borderColor={'purple.700'}
            borderRadius={6}
            transition={'all 150ms ease'}
            boxShadow={'0 3px 3px rgba(#000, 0.25)'}
            _hover={{
              color: 'purple.700',
            }}
            _active={{
              boxShadow: 'none',
              transform: 'translateY(2px)',
            }}
          >
            Sair
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default memo(SideBarAvatarHero)
