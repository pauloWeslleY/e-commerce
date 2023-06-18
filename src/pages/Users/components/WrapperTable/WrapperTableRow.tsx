import { ReactNode, memo } from 'react'
import { ButtonGroup, Td, Tr } from '@chakra-ui/react'
import { UserType } from '../../../../types/UsersType'
import { ModalUserHero } from '../ModalUserHero'
import { WrapperTableCell, WrapperTableTdHero } from './index'

interface WrapperTableRowProps {
  users: UserType
  children: ReactNode
}

interface UserProps {
  label: string
  value: string
}

const WrapperTableRow = ({ children, users }: WrapperTableRowProps) => {
  const { id, username, email } = users

  const USER: UserProps[] = [
    { label: 'ID:', value: id },
    { label: 'Nome:', value: username },
    { label: 'Email:', value: email },
  ]

  return (
    <Tr
      display={{ base: 'grid', md: 'table-row' }}
      sx={{
        '@media print': { display: 'table-row' },
        gridTemplateColumns: 'minmax(0px, 35%) minmax(0px, 65%)',
        gridGap: '10px',
      }}
    >
      {USER.map(user => (
        <>
          <WrapperTableCell title={user.label} />
          <WrapperTableTdHero label={user.value} />
        </>
      ))}
      <WrapperTableCell title="Ações" />

      <Td>
        <ButtonGroup size={'sm'} spacing={3}>
          <ModalUserHero user={users} />

          {children}
        </ButtonGroup>
      </Td>
    </Tr>
  )
}

export default memo(WrapperTableRow)
