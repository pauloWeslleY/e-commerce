import { HiOutlineMail } from 'react-icons/hi'
import { HeroTitleBar } from '../../components/HeroTitle'
import { SideBar } from '../../components/SideBar'
import { HeroEmail } from './components/HeroEmail'
import Chart from './components/Products'
import { Flex } from '@chakra-ui/react'
// import { auth } from '../../services/firebase'

export function Email() {
  // auth.

  //   .createUser({
  //     email: 'user@example.com',
  //     emailVerified: false,
  //     phoneNumber: '+11234567890',
  //     password: 'secretPassword',
  //     displayName: 'John Doe',
  //     photoURL: 'http://www.example.com/12345678/photo.png',
  //     disabled: false,
  //   })
  //   .then(userRecord => {
  //     // See the UserRecord reference doc for the contents of userRecord.
  //     console.log('Successfully created new user:', userRecord.uid)
  //   })
  //   .catch(error => {
  //     console.log('Error creating new user:', error)
  //   })

  return (
    <SideBar>
      <HeroTitleBar label="E-mail" icon={HiOutlineMail} />

      <section>
        <HeroEmail />
      </section>

      <Flex w={'full'} h={'full'}>
        <Chart />
      </Flex>
    </SideBar>
  )
}
