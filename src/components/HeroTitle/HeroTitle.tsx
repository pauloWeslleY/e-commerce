import { memo } from 'react'
import { Heading, HeadingProps } from '@chakra-ui/react'

interface HeroTitleProps extends HeadingProps {
  title: string
}

const HeroTitle = ({ title, ...rest }: HeroTitleProps) => (
  <Heading
    {...rest}
    fontSize={['xl', '4xl']}
    fontFamily={'Poppins'}
    fontWeight={'semibold'}
  >
    {title}
  </Heading>
)

export default memo(HeroTitle)
