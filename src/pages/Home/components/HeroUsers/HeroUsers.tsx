import { memo } from 'react'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { useFetch } from '../../../../hooks/useFetch'
import { useThemeColors } from '../../../../hooks/useThemeColors'

function HeroUsers() {
  const { users } = useFetch()
  const { THEME } = useThemeColors()

  return (
    <Flex as={'section'} flexDir={'column'} px={8} py={4}>
      <Stack py={2}>
        <Text as={'h2'} fontSize={'2xl'} fontWeight={500}>
          Usuários Cadastrado
        </Text>
      </Stack>
      <Flex flexDir={'column'} color={THEME.TEXT_COLORS}>
        {users.map(user => (
          <Box
            key={user.id}
            borderBottomWidth={2}
            borderColor={'purple.700'}
            fontFamily={'Inter'}
            py={5}
          >
            <span>{user.username}</span>
          </Box>
        ))}
      </Flex>
    </Flex>
  )
}

export default memo(HeroUsers)
