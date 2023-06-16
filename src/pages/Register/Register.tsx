import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, Stack, useToast, chakra, Image, Text } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { RiUser3Fill } from 'react-icons/ri'
import { addDoc, getDocs } from 'firebase/firestore'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../services/firebase'
import { InputPassword } from '../../components/Form/InputPassword'
import { HeroTitle } from '../../components/HeroTitle'
import { ButtonSign } from '../../components/Buttons'
import { InputFooter } from '../../components/Form/InputFooter'
import { Loading } from '../../components/Loading'
import { InputFieldBar } from '../../components/Form/InputBar'
import { useThemeColors } from '../../hooks/useThemeColors'
import { useLoading } from '../../hooks/useLoading'
import { UserType } from '../../types/UsersType'
import { usersCollectionRef } from '../../services/collections'
import Logotipo from '../../assets/logotipo.svg'

export function Register() {
  const [username, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [users, setUsers] = useState<UserType[]>([])
  const { isLoading } = useLoading()
  const { THEME } = useThemeColors()
  const navigate = useNavigate()
  const toast = useToast()

  const handleRegisterUser = async (event: FormEvent) => {
    event.preventDefault()

    const emailAlreadyInUse = users.some(
      (user: UserType) => user.email === email
    )

    try {
      // NOTE: Envie os dados do formulário caso ele for válido
      if (!emailAlreadyInUse) {
        const newUser: UserType = { username, email, password }
        const docRef = await addDoc(usersCollectionRef, newUser)
        setUsers([...users, { id: docRef.id, ...newUser }])
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

        await updateProfile(user, {
          displayName: username,
        })

        toast({
          title: 'Usuário Cadastrado!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        navigate('/')

        return user
      } else {
        toast({
          title: 'Usuário já cadastrado',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    } catch (error) {
      toast({
        title: `Falha ao cadastrar usuário! ==> ${error.message}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }

    setEmail('')
    setPassword('')
    setUserName('')
  }

  useEffect(() => {
    async function getUsers() {
      const dataUser = await getDocs(usersCollectionRef)
      const users = dataUser.docs.map<UserType>(doc => ({
        ...doc.data(),
        id: doc.id,
      }))
      setUsers(users)
    }
    getUsers()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Flex
      as={'main'}
      align={'center'}
      justify={'center'}
      minH={'100vh'}
      bg={THEME.BACKGROUND}
    >
      <Stack as={'section'} spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack as={'header'} align={'center'}>
          <Image src={Logotipo} alt="" />
          <HeroTitle title="Cadastre-se" />

          <Text fontSize={'lg'} fontFamily={'Inter'} fontWeight={'medium'}>
            Crie sua conta agora
          </Text>
        </Stack>
        <Stack
          as={'section'}
          bg={THEME.SIGN_IN.BACKGROUND}
          rounded={'lg'}
          boxShadow={'lg'}
          justify={'center'}
          align={'center'}
          p={10}
        >
          <chakra.form onSubmit={handleRegisterUser}>
            <Stack spacing={4} w={['full', 'sm']}>
              <InputFieldBar
                title="Nome"
                label="username"
                icon={<RiUser3Fill />}
                value={username}
                onChange={event => setUserName(event.target.value)}
              />

              <InputFieldBar
                title="Email"
                label="email"
                icon={<EmailIcon w={4} h={4} />}
                value={email}
                onChange={event => setEmail(event.target.value)}
              />

              <InputPassword
                onChange={event => setPassword(event.target.value)}
                value={password}
                isRequired
              />
              <Stack spacing={10} pt={2}>
                <ButtonSign
                  title="Cadastrar"
                  type="submit"
                  isDisabled={email.length === 0}
                  isLoading={email.length === 0}
                  loadingText={email.length === 0 ? 'Cadastrar' : 'Carregando'}
                  spinnerPlacement={email.length === 0 ? null : 'start'}
                />
              </Stack>
              <InputFooter
                label="Você já tem conta?"
                link="Acesse ela aqui"
                onClick={() => navigate('/')}
              />
            </Stack>
          </chakra.form>
        </Stack>
      </Stack>
    </Flex>
  )
}
