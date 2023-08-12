import { memo } from 'react'
import { HStack, VStack, Text } from '@chakra-ui/react'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthOnStatus } from '../../hooks/useAuthStatus'
import { AvatarHero, AvatarIcon } from '../Avatar'

const SideBarMenuHero = () => {
  const { userOnAuth } = useAuthentication()
  const { userAuth } = useAuthOnStatus()

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
        <Text fontSize={'sm'}>{userOnAuth.username}</Text>
        <Text fontSize={'xs'} fontFamily={'Inter'} color={'purple.300'}>
          {userOnAuth.email}
        </Text>
      </VStack>
    </HStack>
  )
}

export default memo(SideBarMenuHero)
