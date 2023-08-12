import { memo } from 'react'
import {
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react'
import { MdOutlineMoreHoriz } from 'react-icons/md'
import { HiOutlineLogout } from 'react-icons/hi'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useAuthentication } from '../../hooks/useAuthentication'
import { AvatarHero, AvatarIcon } from '../Avatar'

const SideBarAvatarMenu = () => {
  const { userOnAuth, handleLogout } = useAuthentication()
  const { THEME } = useThemeColors()

  return (
    <Popover trigger={'hover'}>
      <PopoverTrigger>
        <IconButton
          aria-label="Settings"
          icon={<MdOutlineMoreHoriz />}
          borderRadius={'full'}
          color={THEME.SPAN_COLORS}
          variant={'ghost'}
          fontSize={20}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Flex align={'center'} gap={2} flexDir={'column'}>
            {userOnAuth.avatar ? (
              <AvatarHero
                size={'lg'}
                avatarUrl={userOnAuth.avatar}
                name={userOnAuth.username}
              />
            ) : (
              <AvatarIcon />
            )}

            <Flex
              flexDir={'column'}
              justify={'center'}
              align={'center'}
              gap={3}
            >
              <Text fontSize={'lg'} fontFamily={'Inter'} fontWeight={500}>
                {userOnAuth.username}
              </Text>
              <Text fontSize={'md'} fontFamily={'Inter'} fontWeight={400}>
                {userOnAuth.email}
              </Text>
            </Flex>
            <Button
              leftIcon={<HiOutlineLogout />}
              variant={'ghost'}
              onClick={handleLogout}
            >
              <span>Sair</span>
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default memo(SideBarAvatarMenu)
