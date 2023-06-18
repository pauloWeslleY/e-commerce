import { memo } from 'react'
import { Box, Text } from '@chakra-ui/react'

const TitleHeroGraphic = ({ title, bg }: { title: string; bg?: string }) => (
  <Box my={2} px={6} py={8} bg={bg} rounded={'md'} shadow={'md'}>
    <Text as={'h3'} fontSize={'2xl'}>
      {title}
    </Text>
  </Box>
)

export default memo(TitleHeroGraphic)
