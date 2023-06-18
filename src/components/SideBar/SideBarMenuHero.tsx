import { memo, useContext } from 'react'
import { Avatar, HStack, VStack, Text } from '@chakra-ui/react'
import { AuthenticationContext } from '../../contexts/authContextProvider'
import { useAuthOnStatus } from '../../hooks/useAuthStatus'
import { IconUser } from '../IconUser'

const SideBarMenuHero = () => {
  const { userOnAuth } = useContext(AuthenticationContext)
  const { userAuth } = useAuthOnStatus()

  return (
    <HStack>
      {userAuth ? (
        <>
          {userOnAuth.avatar ? (
            <Avatar
              size={'md'}
              src={userOnAuth.avatar}
              name={userOnAuth.username}
              pos={'relative'}
              _after={{
                content: '""',
                w: 2,
                h: 2,
                bg: 'green.300',
                border: '2px solid white',
                rounded: 'full',
                pos: 'absolute',
                bottom: -1,
                right: 1,
              }}
            />
          ) : (
            <Avatar boxSize={12} bg={'purple.600'} icon={IconUser} />
          )}
        </>
      ) : (
        <>
          {userOnAuth.avatar ? (
            <Avatar
              size={'md'}
              src={userOnAuth.avatar}
              name={userOnAuth.username}
            />
          ) : (
            <Avatar boxSize={12} bg={'purple.600'} icon={IconUser} />
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
