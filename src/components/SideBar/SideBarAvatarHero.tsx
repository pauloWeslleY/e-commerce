import { memo } from 'react'
import { Button, Flex, Text } from '@chakra-ui/react'
import { HiOutlineLogout } from 'react-icons/hi'
import { useAuthOnStatus } from '../../hooks/useAuthStatus'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useAuthentication } from '../../hooks/useAuthentication'
import { SideBarContainerProps } from '../../types/SideBarType'
import { AvatarHero, AvatarIcon } from '../Avatar'
import { SideBarAvatarMenu } from './index'

const SideBarAvatarHero = ({ collapsed }: SideBarContainerProps) => {
  const { userOnAuth, handleLogout } = useAuthentication()
  const { userAuth } = useAuthOnStatus()
  const { THEME } = useThemeColors()

  console.log('UserOn ==> ', userOnAuth)

  return (
    <Flex
      align={'center'}
      justify={'space-between'}
      flexDir={collapsed ? 'row' : 'column-reverse'}
      gap={2}
      p={2}
      w={'full'}
    >
      {!collapsed && (
        <>
          {userOnAuth.avatar !== null ? (
            <AvatarHero
              size={'md'}
              avatarUrl={userOnAuth.avatar}
              name={userOnAuth.username}
            />
          ) : (
            <AvatarIcon />
          )}
        </>
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
          {userAuth && (
            <>
              {userOnAuth.avatar !== null ? (
                <AvatarHero
                  size={'md'}
                  avatarUrl={userOnAuth.avatar}
                  name={userOnAuth.username}
                />
              ) : (
                <AvatarIcon />
              )}
            </>
          )}
          <Text
            color={THEME.DASHBOARD.TEXT_COLORS}
            fontSize={'sm'}
            fontWeight={'semibold'}
            lineHeight={0}
            pb={0}
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
