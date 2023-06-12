import { memo } from 'react'
import { Box, Text } from '@chakra-ui/react'

const TitleHeroGraphic = ({ title }: { title: string }) => (
  <Box my={2} px={6} py={8}>
    <Text as={'h3'} fontSize={'2xl'} fontFamily={'Poppins'}>
      {title}
    </Text>
  </Box>
)

export default memo(TitleHeroGraphic)
