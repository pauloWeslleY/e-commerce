import { memo } from 'react'
import { Avatar, AvatarProps } from '@chakra-ui/react'

interface AvatarHeroProps extends AvatarProps {
  name: string
  avatarUrl: string
}

const AvatarHero = (props: AvatarHeroProps) => {
  const { name, avatarUrl, ...rest } = props

  return (
    <Avatar
      {...rest}
      src={avatarUrl}
      name={name}
      borderWidth={2}
      borderColor={'purple.100'}
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

export default memo(AvatarHero)
