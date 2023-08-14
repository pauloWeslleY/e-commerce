import { memo } from 'react'
import { chakra, Flex, Spinner } from '@chakra-ui/react'
import { useThemeColors } from '../../hooks/useThemeColors'

const LoaderText = ({ title }: { title: string }) => (
  <chakra.h1 px={4} fontSize={'3xl'} color={'violet.600'}>
    {title}
  </chakra.h1>
)

const Loading = () => {
  const { THEME } = useThemeColors()

  return (
    <Flex
      w={'full'}
      h={'100vh'}
      align={'center'}
      justify={'center'}
      borderRadius={5}
    >
      <Flex p={1} align={'center'}>
        <Spinner
          label={'Loading...'}
          thickness={'0.4rem'}
          speed={'0.65s'}
          emptyColor={'violet.600'}
          color={THEME.LOADING.IS_LOADING_COLORS}
          size={'xl'}
        />
        <LoaderText title="Carregando..." />
      </Flex>
    </Flex>
  )
}

export default memo(Loading)
