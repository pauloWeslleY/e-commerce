import { memo } from 'react'
import { Heading } from '@chakra-ui/react'

interface HeroTitleProps {
  title: string
}

const HeroTitle = ({ title }: HeroTitleProps) => (
  <Heading fontSize={'4xl'} fontFamily={'Poppins'} fontWeight={'semibold'}>
    {title}
  </Heading>
)

export default memo(HeroTitle)
