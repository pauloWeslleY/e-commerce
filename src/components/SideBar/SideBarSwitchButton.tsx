import { memo, useState } from 'react'
import { Button, Flex, Switch } from '@chakra-ui/react'
import { SideBarContainerProps } from '../../types/SideBarType'

function SideBarSwitchButton({ collapsed }: SideBarContainerProps) {
  const [isPersonal, setIsPersonal] = useState(true)
  const [isBusiness, setIsBusiness] = useState(false)

  const handleIsPersonalIsBusiness = ({ target }) => {
    if (target.id === 'personal') {
      setIsBusiness(false)
      setIsPersonal(true)
    }
    if (target.id === 'business') {
      setIsBusiness(true)
      setIsPersonal(false)
    }
  }

  if (!collapsed) {
    return (
      <Flex w={'full'} align={'center'} textAlign={'center'} py={6}>
        <Switch w={'full'} colorScheme="teal" />
      </Flex>
    )
  }

  return (
    <Flex
      w={'full'}
      borderWidth={1}
      borderColor={'blackAlpha.100'}
      borderRadius={14}
      my={6}
    >
      <Button
        w={'full'}
        variant={isPersonal ? 'solid' : 'ghost'}
        borderRadius={14}
        colorScheme={isPersonal ? 'teal' : 'purple'}
        color={isPersonal ? 'whiteAlpha.800' : 'purple.600'}
        id={'personal'}
        textTransform={'uppercase'}
        size={'sm'}
        py={5}
        onClick={handleIsPersonalIsBusiness}
      >
        Personal
      </Button>
      <Button
        w={'full'}
        variant={isBusiness ? 'solid' : 'ghost'}
        borderRadius={14}
        colorScheme={isBusiness ? 'purple' : 'gray'}
        id={'business'}
        textTransform={'uppercase'}
        color={isBusiness ? 'whiteAlpha.800' : 'teal.400'}
        size={'sm'}
        py={5}
        onClick={handleIsPersonalIsBusiness}
      >
        Business
      </Button>
    </Flex>
  )
}

export default memo(SideBarSwitchButton)
