import { memo, useContext } from 'react'
import {
  Avatar,
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
import { AuthenticationContext } from '../../contexts/authContextProvider'
import { useThemeColors } from '../../hooks/useThemeColors'
import { HiOutlineLogout } from 'react-icons/hi'

function SideBarAvatarMenu() {
  const { userOnAuth, handleLogout } = useContext(AuthenticationContext)
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
            <Avatar size={'2xl'} bg={'purple.300'} />

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
