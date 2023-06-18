import { memo, useContext } from 'react'
import {
  Avatar,
  Menu,
  MenuList,
  MenuDivider,
  MenuItem,
  MenuButton,
  Box,
  HStack,
  VStack,
  useColorModeValue,
  Text,
} from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'
import { AuthenticationContext } from '../../contexts/authContextProvider'
import { useNavigate } from 'react-router-dom'
import { TbTool } from 'react-icons/tb'
import { HiOutlineLogout } from 'react-icons/hi'

const SideBarMenuHero = () => {
  const { userOnAuth, handleLogout } = useContext(AuthenticationContext)
  const navigate = useNavigate()

  return (
    <Menu>
      <MenuButton py={2} transition={'all 0.3s'} _focus={{ boxShadow: 'none' }}>
        <HStack>
          <Avatar
            size={'md'}
            src={userOnAuth.avatar}
            name={userOnAuth.username}
          />
          <VStack
            display={{ base: 'none', md: 'flex' }}
            alignItems={'flex-start'}
            spacing={'1px'}
            ml={'2'}
          >
            <Text fontSize={'sm'}>{userOnAuth.username}</Text>
            <Text fontSize={'xs'} color={'purple.300'}>
              {userOnAuth.email}
            </Text>
          </VStack>
          <Box display={{ base: 'none', md: 'flex' }}>
            <FiChevronDown />
          </Box>
        </HStack>
      </MenuButton>
      <MenuList
        bg={useColorModeValue('whiteAlpha.500', 'gray.700')}
        borderColor={useColorModeValue('purple.200', 'purple.700')}
      >
        <MenuItem
          onClick={() => navigate('/dashboard/profile')}
          display={'flex'}
          alignItems={'center'}
          gap={2}
        >
          <TbTool />
          Profile
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={handleLogout}
          display={'flex'}
          alignItems={'center'}
          gap={2}
        >
          <HiOutlineLogout /> Sair
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default memo(SideBarMenuHero)
