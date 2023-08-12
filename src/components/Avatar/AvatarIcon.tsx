import { memo } from 'react'
import { Avatar } from '@chakra-ui/react'
import { IconUser } from '../IconUser'

const AvatarIcon = () => {
  return (
    <Avatar
      boxSize={12}
      icon={IconUser}
      bg={'purple.600'}
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
  )
}

export default memo(AvatarIcon)
