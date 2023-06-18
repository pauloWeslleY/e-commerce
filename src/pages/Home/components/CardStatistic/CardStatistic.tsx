import { memo } from 'react'
import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { CardsHomeType } from '../../../../types/CardsHomeType'
import CountUp from 'react-countup'

interface CardStatisticProps {
  cards: CardsHomeType
}

const CardStatistic = ({ cards }: CardStatisticProps) => {
  const { title, subtitle, icon, background } = cards
  const { THEME } = useThemeColors()

  return (
    <Flex
      flexBasis={56}
      flexGrow={1}
      flexShrink={1}
      justify={'space-between'}
      flexDir={{ base: 'column', md: 'row' }}
      borderRadius={'lg'}
      boxShadow={'lg'}
      p={6}
      bg={background}
      color={THEME.TEXT_COLORS}
    >
      <Stack justifyContent={'center'}>
        <Flex align={'center'} justify={'center'} flexDir={'column'} gap={2}>
          <Heading
            fontSize={'2xl'}
            fontWeight={'medium'}
            fontFamily={'Poppins'}
            letterSpacing={'wide'}
          >
            {title}
          </Heading>
          <Text
            as={'span'}
            fontSize={'4xl'}
            fontWeight={'semibold'}
            textAlign={'center'}
            color={THEME.SPAN_COLORS}
            px={3}
          >
            <CountUp end={subtitle} duration={3} />
          </Text>
        </Flex>
      </Stack>
      <Stack justifyContent={'center'}>
        <Icon as={icon} boxSize={24} color={'blackAlpha.400'} />
      </Stack>
    </Flex>
  )
}

export default memo(CardStatistic)
