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
    rounded={'xl'}
    bg={'violet.800'}
    color={'whiteAlpha.900'}
    transition={'all .2s ease-out 200ms'}
    _hover={{
      transform: 'translateY(-2px)',
      filter: 'brightness(130%)',
      boxShadow: 'md',
      w: 72,
    }}
  >
    {title}
  </Button>
)

export default memo(ButtonSign)
