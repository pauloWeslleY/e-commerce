import { memo, useMemo } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { HeroUserGraphic, HeroUsersList } from '../HeroUsers'
import { useFetch } from '../../../../hooks/useFetch'

const HeroUsersGraphics = () => {
  const { THEME } = useThemeColors()
  const { allUsers } = useFetch()

  const userData = useMemo(() => {
    const users = allUsers.map(props => {
      return {
        id: props.id,
        username: props.username,
      }
    })

    return users
  }, [allUsers])

  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        lg: 'repeat(12, 1fr)',
      }}
      gap={9}
      my={4}
      as={'section'}
    >
      <GridItem
        colSpan={{ lg: 3 }}
        bg={THEME.HOME.BACKGROUND}
        rounded={'md'}
        boxShadow={'lg'}
        h={'md'}
      >
        <HeroUsersList title="Usuários Cadastrado" usersList={userData} />
      </GridItem>

      <GridItem
        colSpan={{ lg: 9 }}
        bg={THEME.HOME.BACKGROUND}
        rounded={'md'}
        boxShadow={'lg'}
        p={4}
        h={'md'}
      >
        <HeroUserGraphic />
      </GridItem>
    </Grid>
  )
}

export default memo(HeroUsersGraphics)
