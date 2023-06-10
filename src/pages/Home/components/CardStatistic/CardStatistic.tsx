import { memo } from 'react'
import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { CardsHomeType } from '../../../../types/CardsHomeType'

interface CardStatisticProps {
  cards: CardsHomeType
}

function CardStatistic({ cards }: CardStatisticProps) {
  const { title, subtitle, icon, background } = cards
  const { THEME } = useThemeColors()

  return (
    <Flex
      flexBasis={56}
      flexGrow={1}
      flexShrink={1}
      justify={'space-around'}
      flexDir={{ base: 'column', md: 'row' }}
      height={{ base: '10rem', md: '12rem' }}
      borderRadius={'lg'}
      boxShadow={'lg'}
      bg={background}
      color={THEME.TEXT_COLORS}
    >
      <Stack justifyContent={'center'} flex={2}>
        <Flex align={'center'} justify={'center'} flexDir={'column'} gap={2}>
          <Heading
            fontSize={'3xl'}
            fontWeight={'semibold'}
            fontFamily={'Poppins'}
            letterSpacing={'wide'}
          >
            {title}
          </Heading>
          <Text
            as={'span'}
            fontSize={'4xl'}
            fontFamily={'Inter'}
            fontWeight={'medium'}
            textAlign={'center'}
            color={THEME.SPAN_COLORS}
            px={3}
          >
            {subtitle}
          </Text>
        </Flex>
      </Stack>
      <Stack direction={'column'} justifyContent={'center'} flex={1}>
        <Icon as={icon} boxSize={20} />
      </Stack>
    </Flex>
  )
}

export default memo(CardStatistic)
