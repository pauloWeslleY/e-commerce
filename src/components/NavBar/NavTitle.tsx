import { memo } from 'react'
import { Flex, Heading, Icon } from '@chakra-ui/react'
import { NavBarProps } from '../../types/NavBarType'

const NavTitle = ({ label, icon }: NavBarProps) => (
  <Flex align={'center'} gap={2}>
    <Icon as={icon} w={8} h={8} />
    <Heading
      fontFamily={'Poppins'}
      fontWeight={'medium'}
      fontSize={'xl'}
      letterSpacing={'wider'}
    >
      {label}
    </Heading>
  </Flex>
)

export default memo(NavTitle)
