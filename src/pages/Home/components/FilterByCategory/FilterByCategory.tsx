import { memo } from 'react'
import { Tabs, TabList, Tab } from '@chakra-ui/react'
import { useColors } from '../../../../hooks/useColors'
import { useFetch } from '../../../../hooks/useFetch'
import { HeroTabPanel } from './index'

function FilterByCategory() {
  const { THEME } = useColors()
  const { isCategories } = useFetch()

  return (
    <Tabs variant={'solid-rounded'} colorScheme={'purple'}>
      <TabList>
        {isCategories.map((category, i) => (
          <Tab key={i} color={THEME.SPAN_COLORS}>
            <span>{category.name}</span>
          </Tab>
        ))}
      </TabList>
      <HeroTabPanel />
    </Tabs>
  )
}

export default memo(FilterByCategory)
