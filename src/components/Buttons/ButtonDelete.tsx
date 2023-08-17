import { memo } from 'react'
import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

const ButtonDelete = ({ ...rest }: IconButtonProps) => (
  <IconButton
    {...rest}
    icon={<DeleteIcon />}
    bg={'transparent'}
    color={'red.600'}
    borderColor={'red.600'}
    borderWidth={2}
    transition={'ease-in-out .4s 100ms'}
    _hover={{
      bg: 'red.600',
      color: 'whiteAlpha.900',
      borderColor: 'red.600',
    }}
  />
)

export default memo(ButtonDelete)
