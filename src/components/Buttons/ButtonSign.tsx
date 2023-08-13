import { memo } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

interface ButtonSignProps extends ButtonProps {
  title: string
}

const ButtonSign = ({ title, ...props }: ButtonSignProps) => (
  <Button
    {...props}
    rightIcon={<ArrowForwardIcon />}
    w={64}
    size={'lg'}
    rounded={'md'}
    bg={'purple.700'}
    color={'whiteAlpha.900'}
    transition={'all .2s ease-out 200ms'}
    _hover={{
      transform: 'translateY(-2px)',
      boxShadow: 'lg',
      opacity: '0.6',
      w: 72,
    }}
  >
    {title}
  </Button>
)

export default memo(ButtonSign)
