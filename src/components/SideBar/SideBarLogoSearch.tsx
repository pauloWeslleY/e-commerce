import { memo } from 'react'
import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useThemeColors } from '../../hooks/useThemeColors'
import { SideBarContainerProps } from '../../types/SideBarType'

const SideBarLogoSearch = ({ collapsed }: SideBarContainerProps) => {
  const { THEME } = useThemeColors()

  return (
    <Flex
      w={'full'}
      align={'center'}
      justify={'space-between'}
      flexDir={collapsed ? 'row' : 'column'}
      gap={4}
    >
      <Box display={'flex'} alignItems={'center'} gap={2}>
        <Image
          src={'/favicon.svg'}
          alt={'Logo do SystemStock'}
          bg={THEME.LOGOTIPO_BACKGROUND}
          boxSize={12}
          rounded={'2xl'}
          p={1}
        />
        {collapsed && (
          <Text
            as={'h2'}
            fontWeight={'bold'}
            fontSize={'2xl'}
            fontFamily={'Inter'}
            bgGradient={'linear(to-r, purple.600, purple.300)'}
            backgroundClip={'text'}
            letterSpacing={1}
          >
            SystemStock
          </Text>
        )}
      </Box>
      <IconButton
        aria-label="Search"
        variant={'ghost'}
        icon={<AiOutlineSearch />}
        fontSize={16}
        color={THEME.TEXT_COLORS}
        borderRadius={'50%'}
      />
    </Flex>
  )
}

export default memo(SideBarLogoSearch)
