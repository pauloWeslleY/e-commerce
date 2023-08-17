import { memo } from 'react'
import { Avatar, AvatarProps } from '@chakra-ui/react'
import { useThemeColors } from '../../hooks/useThemeColors'

interface AvatarHeroProps extends AvatarProps {
  name: string
  avatarUrl: string
}

const AvatarHero = (props: AvatarHeroProps) => {
  const { name, avatarUrl, ...rest } = props
  const { THEME } = useThemeColors()

  return (
    <Avatar
      {...rest}
      src={avatarUrl}
      name={name}
      borderWidth={2}
      borderColor={THEME.DASHBOARD.SIDEBAR_AVATAR_HERO_BORDER_COLORS}
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
