import { memo } from 'react'
import { Box, GridItem, SimpleGrid } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { FormUpdateProfile, FormProfileHead } from './index'

const FormProfileHero = () => {
  const { THEME } = useThemeColors()

  return (
    <Box
      bg={THEME.DASHBOARD.TABLE_PRODUCT_BG}
      shadow={'lg'}
      rounded={'md'}
      p={10}
    >
      <SimpleGrid
        display={{ base: 'initial', md: 'grid' }}
        columns={{ md: 3 }}
        spacing={{ md: 6 }}
      >
        <GridItem colSpan={{ md: 1 }}>
          <FormProfileHead />
        </GridItem>
        <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
          <FormUpdateProfile />
        </GridItem>
      </SimpleGrid>
    </Box>
  )
}

export default memo(FormProfileHero)
