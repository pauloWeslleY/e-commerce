import { ReactElement, memo } from 'react'
import { IconButton, IconButtonProps } from '@chakra-ui/react'

interface BtnIconProps extends IconButtonProps {
  icon: ReactElement
}

const BtnIcon = ({ icon, ...rest }: BtnIconProps) => (
  <IconButton
    {...rest}
    size={'sm'}
    rounded={'lg'}
    icon={icon}
  />
)

export default memo(BtnIcon)
