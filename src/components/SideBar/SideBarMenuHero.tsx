import { HStack, VStack, Text } from '@chakra-ui/react'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthOnStatus } from '../../hooks/useAuthStatus'
import { AvatarHero, AvatarIcon } from '../Avatar'
import { useThemeColors } from '../../hooks/useThemeColors'

export const SideBarMenuHero = () => {
  const { userOnAuth } = useAuthentication()
  const { userAuth } = useAuthOnStatus()
  const { THEME } = useThemeColors()

  return (
    <HStack>
      {userAuth ? (
        <>
          {userOnAuth.avatar ? (
            <AvatarHero
              size={'md'}
              avatarUrl={userOnAuth.avatar}
              name={userOnAuth.username}
            />
          ) : (
            <AvatarIcon />
          )}
        </>
      ) : (
        <>
          {userOnAuth.avatar ? (
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

      <VStack
        display={{ base: 'none', md: 'flex' }}
        alignItems={'flex-start'}
        spacing={'1px'}
        ml={'2'}
      >
        <Text fontSize={'sm'} color={THEME.DASHBOARD.SIDE_BAR_TEXT_COLORS}>
          {userOnAuth.username}
        </Text>
        <Text
          fontSize={'xs'}
          fontFamily={'Inter'}
          color={THEME.DASHBOARD.SIDEBAR_AVATAR_HERO_COLORS}
        >
          {userOnAuth.email}
        </Text>
      </VStack>
    </HStack>
  )
}
