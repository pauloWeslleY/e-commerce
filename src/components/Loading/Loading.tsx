import { memo } from 'react'
import { chakra, Flex, Spinner } from '@chakra-ui/react'

type LoaderTextProps = {
  title: string
}

const LoaderText = ({ title }: LoaderTextProps) => (
  <chakra.h1 px={4} fontSize={'3xl'} color={'purple.300'}>
    {title}
  </chakra.h1>
)

const Loading = () => (
  <Flex h={'100vh'} align={'center'} justify={'center'}>
    <Flex p={1} align={'center'}>
      <Spinner
        label={'Loading...'}
        thickness={'0.4rem'}
        speed={'0.65s'}
        emptyColor={'purple.700'}
        color={'gray.500'}
        size={'xl'}
      />
      <LoaderText title="Carregando..." />
    </Flex>
  </Flex>
)

export default memo(Loading)
