import { memo } from 'react'
import { Stack, Flex, Image, Text } from '@chakra-ui/react'
import { HeroTitle } from '../../HeroTitle'

interface FormHeaderProps {
  logo: string
  title: string
  description: string
}

const FormHeader = ({ logo, title, description }: FormHeaderProps) => (
  <Stack as={'header'} align={'center'}>
    <Flex align={'center'} gap={3}>
      <Image src={logo} alt="Logotipo" boxSize={16} />
      <HeroTitle title={title} color={'purple.600'} />
    </Flex>

    <Text fontSize={['md', 'xl']} fontFamily={'Inter'} fontWeight={'medium'}>
      {description}
    </Text>
  </Stack>
)

export default memo(FormHeader)
