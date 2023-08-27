import { memo } from 'react'
import { Alert, AlertIcon, AlertProps } from '@chakra-ui/react'

interface AlertHeroProps extends AlertProps {
  status: any
  description: string
}

const AlertHero = ({ status, description, ...props }: AlertHeroProps) => (
  <Alert {...props} status={status}>
    <AlertIcon />
    {description}
  </Alert>
)

export default memo(AlertHero)
