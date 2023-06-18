import { memo } from 'react'
import { chakra, Flex, Spinner } from '@chakra-ui/react'
import { useThemeColors } from '../../hooks/useThemeColors'

type LoaderTextProps = {
  title: string
}

const LoaderText = ({ title }: LoaderTextProps) => (
  <chakra.h1 px={4} fontSize={'3xl'} color={'purple.600'}>
    {title}
  </chakra.h1>
)

const Loading = () => {
  const { THEME } = useThemeColors()

  return (
    <Flex w={'full'} h={'full'} align={'center'} justify={'center'}>
      <Flex p={1} align={'center'}>
        <Spinner
          label={'Loading...'}
          thickness={'0.4rem'}
          speed={'0.65s'}
          emptyColor={'purple.600'}
          color={THEME.LOADING.IS_LOADING_COLORS}
          size={'xl'}
        />
        <LoaderText title="Carregando..." />
      </Flex>
    </Flex>
  )
}

export default memo(Loading)
